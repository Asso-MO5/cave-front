import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const BASE_FOLDER = 'api'

// Fonction utilitaire pour générer les imports des modèles à partir des réponses
function generateImportsForModels(responses) {
  const imports = new Set()

  for (const response of Object.values(responses)) {
    if (response.schema && response.schema.$ref) {
      const modelClass = response.schema.$ref.split('/').pop()
      imports.add(`import { ${modelClass} } from './${modelClass}.js';`)
    }
  }

  return Array.from(imports).join('\n')
}

// Fonction utilitaire pour générer la JSDoc des paramètres
function generateJSDocParams(parameters) {
  return parameters
    .map((param) => {
      const { name, in: location, type, description } = param
      const jsdocType = type === 'integer' ? 'number' : type
      return `   * @param {${jsdocType}} ${name} - ${
        description || ''
      } (${location})`
    })
    .join('\n')
}

// Fonction pour générer une classe de service en fonction des endpoints et des réponses
function generateApiServiceForEndpoint(
  httpMethod,
  endpoint,
  className,
  roles,
  description,
  parameters,
  responses
) {
  const jsdocParams = generateJSDocParams(parameters)

  // Générer les conditions pour les différents codes de réponse
  let responseHandling = ''
  let firstModel = null
  for (const [statusCode, response] of Object.entries(responses)) {
    if (response.schema && response.schema.$ref) {
      const modelClass = response.schema.$ref.split('/').pop()
      if (!firstModel && parseInt(statusCode || '') < 300)
        firstModel = modelClass
      responseHandling += `
        if (response.status === ${statusCode}) {
          return this.bindModel(data, ${modelClass});
        }
      `
    }
  }

  return `
    import { ApiService } from './ApiService';
    ${generateImportsForModels(responses)}

    /**
     * ${description}
     * @class ${className}Service
     * @roles ${roles.join(', ')}
     */
    export class ${className}Service extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ${JSON.stringify(roles)};
        this.verb = '${httpMethod.toUpperCase()}';
      }

      /**
       * Vérifie si l'utilisateur a les droits nécessaires pour accéder à cet endpoint
       * @param {Array<string>} userRoles - Les rôles de l'utilisateur
       * @returns {boolean} - True si l'utilisateur a les droits, sinon False
       */
      hasAccess(userRoles = []) {
        return this.roles.some(role => userRoles.includes(role));
      }

      /**
       * ${description}
       * @roles ${roles.join(', ')}
       * @returns {Promise<${firstModel}>} - Un modèle de type ${firstModel}
       *
${jsdocParams}
       */
      async execute(queryParams = {}, ssr = false, context = {}) {
        if (!this.hasAccess(context.userRoles)) {
          throw new Error('Access denied: insufficient permissions');
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const endpoint = \`${endpoint}?\${queryString}\`;
        const response = await this.fetchData(endpoint, '${httpMethod.toUpperCase()}', null, {}, ssr, context);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        ${responseHandling}

        throw new Error(\`Unexpected response status: \${response.status}\`);
      }
    }
  `
}

// Fonction pour générer les classes des modèles à partir de Swagger
function generateClassFromSwagger(definitionName, definition) {
  let imports = '' // Stocke les imports nécessaires

  let classDef = `/**
 * @class ${definitionName}
 * @description Classe représentant une réponse de type ${definitionName}.
 */
export class ${definitionName} {\n`

  const properties = definition.properties || {}

  // Ajouter JSDoc pour les paramètres du constructeur
  classDef += `  /**\n`
  for (const [propName, prop] of Object.entries(properties || {})) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'
    if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      // Ajouter l'import nécessaire pour les modèles imbriqués
      imports += `import { ${refModelName} } from './${refModelName}.js';\n`
    }
    classDef += `   * @param {${jsdocType}} ${propName}\n`
  }
  classDef += `   */\n`

  // Constructor
  const props = Object.keys(properties || {}).length
    ? `{${Object.keys(properties || {}).join(', ')}}`
    : ''
  classDef += `  constructor(${props}) {\n`

  for (const [propName, prop] of Object.entries(properties || {})) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'
    if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      // Instancier la classe imbriquée
      classDef += `    /** @type {${jsdocType}} */\n`
      classDef += `    this.${propName} = new ${refModelName}(${propName});\n`
    } else {
      // Typage normal pour les propriétés non imbriquées
      classDef += `    /** @type {${jsdocType}} */\n`
      classDef += `    this.${propName} = ${propName};\n`
    }
  }

  classDef += '  }\n\n'

  // Getters and Setters
  for (const [propName, prop] of Object.entries(properties)) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'
    if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      classDef += `  /** @type {${jsdocType}} */\n`
      classDef += `  get ${propName}() { return this._${propName}; }\n`
      classDef += `  set ${propName}(value) {\n`
      classDef += `    if (!(value instanceof ${refModelName})) throw new TypeError('Expected an instance of ${refModelName} for ${propName}');\n`
      classDef += `    this._${propName} = value;\n`
      classDef += `  }\n\n`
    } else {
      classDef += `  /** @type {${jsdocType}} */\n`
      classDef += `  get ${propName}() { return this._${propName}; }\n`
      classDef += `  set ${propName}(value) {\n`
      classDef += `    if (typeof value !== '${jsdocType}') throw new TypeError('Expected a ${jsdocType} for ${propName}');\n`
      classDef += `    this._${propName} = value;\n`
      classDef += `  }\n\n`
    }
  }

  classDef += '}\n'

  // Retourner la classe avec les imports au début
  return imports + classDef
}

// Fonction principale qui génère les services d'API à partir de Swagger
function generateServicesFromSwagger(apiJson) {
  const apiFolder = path.join(process.cwd(), 'api')

  if (!existsSync(apiFolder)) mkdirSync(apiFolder)

  for (const [endpoint, params] of Object.entries(apiJson.paths)) {
    for (const [verb, config] of Object.entries(params)) {
      const roles = config.description.split('<br/>').filter((c) => c !== '')
      const description = config.summary || 'No description provided'
      const className =
        config.operationId.charAt(0).toUpperCase() + config.operationId.slice(1)

      const parameters = config.parameters || []
      const responses = config.responses || {}

      const apiService = generateApiServiceForEndpoint(
        verb,
        endpoint,
        className,
        roles,
        description,
        parameters,
        responses
      )

      writeFileSync(
        path.join(apiFolder, `${className}Service.js`),
        apiService,
        'utf8'
      )
    }
  }
}

// Fonction pour générer les classes des modèles à partir de Swagger et les services
async function createApi() {
  console.log('Creating API...')
  const apiFolder = path.join(process.cwd(), BASE_FOLDER)
  console.log('API Folder:', apiFolder)
  const isExist = existsSync(path.join(process.cwd(), BASE_FOLDER))
  if (!isExist) mkdirSync(path.join(process.cwd(), BASE_FOLDER))

  let apiJson = null
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/swagger.json')
    apiJson = await res.json()

    console.log('Creating classes...')
    const definitions = apiJson.definitions
    for (const [definitionName, definition] of Object.entries(definitions)) {
      const classDef = generateClassFromSwagger(definitionName, definition)
      writeFileSync(
        path.join(apiFolder, `${definitionName}.js`),
        classDef,
        'utf8'
      )
    }

    generateServicesFromSwagger(apiJson)
    console.log('API created!')
  } catch (error) {
    console.log('Error fetching routes:', error)
  }
}

createApi()
