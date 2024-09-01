
    import { ApiService } from './utils/ApiService.mjs';
    import { Model11 } from './Model11.mjs';

    /**
     * Récupère la liste des cartels d'une exposition
     * @class PostExposCartelsService
     * @roles Membres MO5
     */
    export class PostExposCartelsService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5"];
        this.verb = 'POST';
        this.endpoint = '/expos/cartels';
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
       * @description Récupère la liste des cartels d'une exposition
       * @roles Membres MO5
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       *
       * @returns { Promise<Model11> } - Un modèle de type Model11
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
        
        if (response.status === 200) {
        if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Model11));
        } else {
          return this.bindModel(data, Model11);
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  