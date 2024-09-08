
    import { ApiService } from './utils/ApiService.mjs';
    import { Media } from './Media.mjs';

    /**
     * Permet de créer un media
     * @class PostMediasService
     * @roles publisher, reviewer
     */
    export class PostMediasService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["publisher","reviewer"];
        this.verb = 'POST';
        this.endpoint = '/medias';
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
       * @description Permet de créer un media
       * @roles publisher, reviewer
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       *
       * @returns { Promise<Media> } - Un modèle de type Media
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
    
        if(!config.noModel) {
            if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Media));
        } else {
          return this.bindModel(data, Media);
        }
        } else {
          return data;
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  