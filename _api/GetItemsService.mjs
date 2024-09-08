
    import { ApiService } from './utils/ApiService.mjs';
    import { ItemSearch } from './ItemSearch.mjs';

    /**
     * Récupère la liste des items par type et recherche
     * @class GetItemsService
     * @roles Membres MO5
     */
    export class GetItemsService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5"];
        this.verb = 'GET';
        this.endpoint = '/items';
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
       * @description Récupère la liste des items par type et recherche
       * @roles Membres MO5
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
               * @param { Object } config.query - Les paramètres de la requête
* @param { string } config.query.search - search (required)
* @param { string } config.query.type - type (required)
       *
       * @returns { Promise<ItemSearch> } - Un modèle de type ItemSearch
       *
       * @param {string} authorization -  (header)
   * @param {string} search -  (query)
   * @param {string} type -  (query)
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
          return data.map(item => this.bindModel(item, ItemSearch));
        } else {
          return this.bindModel(data, ItemSearch);
        }
        } else {
          return data;
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  