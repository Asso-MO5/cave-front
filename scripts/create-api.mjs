import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const BASE_FOLDER = '_api'

// Fonction utilitaire pour générer les imports des modèles à partir des réponses
function generateImportsForModels(responses) {
  const imports = new Set()

  for (const response of Object.values(responses)) {
    if (response.schema && response.schema.$ref) {
      const modelClass = response.schema.$ref.split('/').pop()
      imports.add(`import { ${modelClass} } from './${modelClass}.mjs';`)
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
    
        if(!config.noModel) {
            if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, ${modelClass}));
        } else {
          return this.bindModel(data, ${modelClass});
        }
        } else {
          return data;
        }
        }
      `
    }
  }

  const args = endpoint
    .split('/')
    .filter((arg) => arg.startsWith('{'))
    .map((arg) => arg.slice(1, -1))

  const query = parameters
    .filter((param) => param.in === 'query')
    .map((param) => {
      return `* @param { string } config.query.${param.name} - ${param.name} ${
        param.required ? '(required)' : ''
      }`
    })

  return `
    import { ApiService } from './utils/ApiService.mjs';
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
        this.endpoint = '${endpoint}';
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
       * @description ${description}
       * @roles ${roles.join(', ')}
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       ${
         query.length > 0
           ? '        * @param { Object } config.query - Les paramètres de la requête\n' +
             query.join('\n')
           : '*'
       }
       ${
         endpoint.includes('{')
           ? `* @param { Object } config.params - Les paramètres de la requête\n${args
               .map(
                 (arg) =>
                   `       * @param { string } config.params.${arg} - ${arg}`
               )
               .join('\n')}`
           : '*'
       }
       * @returns { Promise<${firstModel}> } - Un modèle de type ${firstModel}
       *
    ${jsdocParams}
       */
      async execute(config) {
      const{ context } = config
        if (!this.hasAccess(context.userRoles)) 
          throw new Error('Access denied: insufficient permissions');

        const response = await this.fetchData(config);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        ${responseHandling}

        throw new Error(\`Unexpected response status: \${response.status}\`);
      }
    }
  `
}

function generateClassFromSwagger(definitionName, definition) {
  const isArray = definition.type === 'array'
  const extendsClass = isArray ? definition.items['$ref'].split('/').pop() : ''

  let imports = isArray
    ? `import { ${extendsClass} } from './${extendsClass}.mjs'\n\n`
    : `` // Stocke les imports nécessaires

  console.log('Generating class for:', definitionName, definition.type)

  let classDef = `/**
 * @class ${definitionName}
 * @description Classe représentant une réponse de type ${definitionName}.
 */
export class ${definitionName}  ${isArray ? 'extends ' + extendsClass : ''} {\n`

  const properties = definition.properties || {}

  // Ajouter JSDoc pour les paramètres du constructeur
  classDef += `  /**\n`
  for (const [propName, prop] of Object.entries(properties || {})) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'

    if (prop.type === 'array' && prop.items.$ref) {
      const refModelName = prop.items.$ref.split('/').pop()
      jsdocType = `${refModelName}[]` // Typage pour un tableau de modèles
      // Ajouter l'import nécessaire pour les modèles imbriqués
      if (imports.indexOf(`import { ${refModelName} }`) === -1)
        imports += `import { ${refModelName} } from './${refModelName}.mjs';\n`
    } else if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      // Ajouter l'import nécessaire pour les modèles imbriqués
      if (imports.indexOf(`import { ${refModelName} }`) === -1)
        imports += `import { ${refModelName} } from './${refModelName}.mjs';\n`
    }

    classDef += `   * @param {${jsdocType}} ${propName}\n`
  }
  classDef += `   */\n`

  // Constructor

  classDef += `  constructor(props = {}) {\n`

  if (isArray) classDef += `super(props);\n`

  for (const [propName, prop] of Object.entries(properties || {})) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'

    if (prop.type === 'array' && prop.items.$ref) {
      const refModelName = prop.items.$ref.split('/').pop()
      jsdocType = `${refModelName}[]` // Typage pour un tableau de modèles
      // Instancier un tableau de modèles imbriqués
      classDef += `    /** @type {${jsdocType}} */\n`
      classDef += `    this.${propName} = (${propName} || []).map(item => new ${refModelName}(item));\n`
    } else if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      // Instancier la classe imbriquée
      classDef += `    /** @type {${jsdocType}} */\n`
      classDef += `    this.${propName} = new ${refModelName}(${propName});\n`
    } else {
      // Typage normal pour les propriétés non imbriquées
      classDef += `    /** @type {${jsdocType}} */\n`
      classDef += `    this.${propName} = props.${propName} || null;\n`
    }
  }

  classDef += '  }\n\n'

  // Getters and Setters
  for (const [propName, prop] of Object.entries(properties)) {
    let jsdocType = prop.type === 'integer' ? 'number' : prop.type || 'object'

    if (prop.type === 'array' && prop.items.$ref) {
      const refModelName = prop.items.$ref.split('/').pop()
      jsdocType = `${refModelName}[]`
      classDef += `  /** @type {${jsdocType}} */\n`
      classDef += `  get ${propName}() { return this._${propName}; }\n`
      classDef += `  set ${propName}(value) {\n`
      classDef += `    if (!Array.isArray(value)) throw new TypeError('Expected an array for ${propName}');\n`
      classDef += `    this._${propName} = value.map(item => new ${refModelName}(item));\n`
      classDef += `  }\n\n`
    } else if (prop.$ref) {
      const refModelName = prop.$ref.split('/').pop()
      jsdocType = refModelName
      classDef += `  /** @type {${jsdocType}} */\n`
      classDef += `  get ${propName}() { return this._${propName}; }\n`
      classDef += `  set ${propName}(value) {\n`
      classDef += `    if (!(value instanceof ${refModelName} && (typeof value === 'null' || typeof value === 'undefined'))) throw new TypeError('Expected an instance of ${refModelName} for ${propName}');\n`
      classDef += `    this._${propName} = value;\n`
      classDef += `  }\n\n`
    } else {
      classDef += `  /** @type {${jsdocType}} */\n`
      classDef += `  get ${propName}() { return this._${propName}; }\n`
      classDef += `  set ${propName}(value) {\n`
      classDef += `    if (typeof value !== '${jsdocType}' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a ${jsdocType} for ${propName}');\n`
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
  const apiFolder = path.join(process.cwd(), BASE_FOLDER)

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
        path.join(apiFolder, `${className}Service.mjs`),
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
        path.join(apiFolder, `${definitionName}.mjs`),
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
