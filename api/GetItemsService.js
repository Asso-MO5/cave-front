
    import { ApiService } from './ApiService';
    

    /**
     * Récupère la liste des items (jeux, machines, listes, etc.)
     * @class GetItemsService
     * @roles Membres MO5
     */
    export class GetItemsService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5"];
        this.verb = 'GET';
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
       * Récupère la liste des items (jeux, machines, listes, etc.)
       * @roles Membres MO5
       * @returns {Promise<null>} - Un modèle de type null
       *
   * @param {string} authorization -  (header)
   * @param {string} type -  (query)
   * @param {number} limit -  (query)
       */
      async execute(queryParams = {}, ssr = false, context = {}) {
        if (!this.hasAccess(context.userRoles)) {
          throw new Error('Access denied: insufficient permissions');
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const endpoint = `/items?${queryString}`;
        const response = await this.fetchData(endpoint, 'GET', null, {}, ssr, context);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  