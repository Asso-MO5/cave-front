
    import { ApiService } from './ApiService';
    import { Model2 } from './Model2.js';

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
       * Permet de changer le status d'un item
       * @roles reviewer
       * @returns {Promise<Model2>} - Un modèle de type Model2
       *
   * @param {string} authorization -  (header)
       */
      async execute(queryParams = {}, ssr = false, context = {}) {
        if (!this.hasAccess(context.userRoles)) {
          throw new Error('Access denied: insufficient permissions');
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const endpoint = `/items/{id}/status/{status}?${queryString}`;
        const response = await this.fetchData(endpoint, 'PUT', null, {}, ssr, context);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 201) {
          return this.bindModel(data, Model2);
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  