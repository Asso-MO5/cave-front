
    import { ApiService } from './utils/ApiService.mjs';
    import { Company } from './Company.mjs';

    /**
     * Récupère une entreprise par son slug
     * @class GetCompaniesSlugService
     * @roles Membres MO5
     */
    export class GetCompaniesSlugService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5"];
        this.verb = 'GET';
        this.endpoint = '/companies/{slug}';
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
       * @description Récupère une entreprise par son slug
       * @roles Membres MO5
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       * @param { Object } config.params - Les paramètres de la requête
       * @param { string } config.params.slug - slug
       * @returns { Promise<Company> } - Un modèle de type Company
       *
       * @param {string} authorization -  (header)
   * @param {string} slug -  (path)
       */
      async execute(config) {
      const{ context } = config
        if (!this.hasAccess(context.userRoles)) 
          throw new Error('Access denied: insufficient permissions');

        const response = await this.fetchData(config);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 200) {
    
        if(!config.noModel) {
            if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Company));
        } else {
          return this.bindModel(data, Company);
        }
        } else {
          return data;
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  