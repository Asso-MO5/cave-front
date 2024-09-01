
    import { ApiService } from './utils/ApiService.mjs';
    import { MediaLightList } from './MediaLightList.mjs';

    /**
     * Récupère la liste des medias
     * @class GetMediasLightService
     * @roles Membres MO5
     */
    export class GetMediasLightService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["Membres MO5"];
        this.verb = 'GET';
        this.endpoint = '/medias/light';
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
       * @description Récupère la liste des medias
       * @roles Membres MO5
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
               * @param { Object } config.query - Les paramètres de la requête
* @param { string } config.query.search - search 
       *
       * @returns { Promise<MediaLightList> } - Un modèle de type MediaLightList
       *
       * @param {string} authorization -  (header)
   * @param {string} search -  (query)
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
          return data.map(item => this.bindModel(item, MediaLightList));
        } else {
          return this.bindModel(data, MediaLightList);
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  