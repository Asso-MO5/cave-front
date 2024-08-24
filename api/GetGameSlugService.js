
    import { ApiService } from './ApiService';
    import { Game } from './Game.js';

    /**
     * Récupère jeu par son slug
     * @class GetGameSlugService
     * @roles Membres MO5, Master Control Program
     */
    export class GetGameSlugService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5","Master Control Program"];
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
       * Récupère jeu par son slug
       * @roles Membres MO5, Master Control Program
       * @returns {Promise<Game>} - Un modèle de type Game
       *
   * @param {string} authorization -  (header)
       */
      async execute(queryParams = {}, ssr = false, context = {}) {
        if (!this.hasAccess(context.userRoles)) {
          throw new Error('Access denied: insufficient permissions');
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const endpoint = `/game/{slug}?${queryString}`;
        const response = await this.fetchData(endpoint, 'GET', null, {}, ssr, context);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 200) {
          return this.bindModel(data, Game);
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  