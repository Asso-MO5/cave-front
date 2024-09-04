
    import { ApiService } from './utils/ApiService.mjs';
    import { Company } from './Company.mjs';

    /**
     * Crée une entreprise
     * @class PostCompaniesService
     * @roles publisher, reviewer
     */
    export class PostCompaniesService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["publisher","reviewer"];
        this.verb = 'POST';
        this.endpoint = '/companies';
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
       * @description Crée une entreprise
       * @roles publisher, reviewer
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       *
       * @returns { Promise<Company> } - Un modèle de type Company
       *
       * @param {string} authorization -  (header)
   * @param {undefined} body -  (body)
       */
      async execute(config) {
      const{ context } = config
        if (!this.hasAccess(context.userRoles)) 
          throw new Error('Access denied: insufficient permissions');

        const response = await this.fetchData(config);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 201) {
        if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Company));
        } else {
          return this.bindModel(data, Company);
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  