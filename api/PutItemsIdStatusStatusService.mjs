
    import { ApiService } from './utils/ApiService';
    import { ItemStatusUpdated } from './ItemStatusUpdated.mjs';

    /**
     * Permet de changer le status d'un item
     * @class PutItemsIdStatusStatusService
     * @roles reviewer
     */
    export class PutItemsIdStatusStatusService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["reviewer"];
        this.verb = 'PUT';
        this.endpoint = '/items/{id}/status/{status}';
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
       * @description Permet de changer le status d'un item
       * @roles reviewer
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       * @param { Object } config.params - Les paramètres de la requête
       * @param { string } config.params.id - id
       * @param { string } config.params.status - status
       * @returns { Promise<ItemStatusUpdated> } - Un modèle de type ItemStatusUpdated
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
          return data.map(item => this.bindModel(item, ItemStatusUpdated));
        } else {
          return this.bindModel(data, ItemStatusUpdated);
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  