
    import { ApiService } from './ApiService';
    import { Games } from './Games.js';

    /**
     * Récupère la liste des jeux
     * @class GetGamesService
     * @roles Membres MO5
     */
    export class GetGamesService extends ApiService {
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
       * Récupère la liste des jeux
       * @roles Membres MO5
       * @returns {Promise<Games>} - Un modèle de type Games
       *
   * @param {string} authorization -  (header)
   * @param {number} limit -  (query)
       */
      async execute(queryParams = {}, ssr = false, context = {}) {
        if (!this.hasAccess(context.userRoles)) {
          throw new Error('Access denied: insufficient permissions');
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const endpoint = `/games?${queryString}`;
        const response = await this.fetchData(endpoint, 'GET', null, {}, ssr, context);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 200) {
          return this.bindModel(data, Games);
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  