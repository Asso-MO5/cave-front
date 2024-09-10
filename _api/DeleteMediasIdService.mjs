
    import { ApiService } from './utils/ApiService.mjs';
    import { DeleteMediaModel } from './DeleteMediaModel.mjs';

    /**
     * Supprime un media
     * @class DeleteMediasIdService
     * @roles publisher, reviewer
     */
    export class DeleteMediasIdService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["publisher","reviewer"];
        this.verb = 'DELETE';
        this.endpoint = '/medias/{id}';
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
       * @description Supprime un media
       * @roles publisher, reviewer
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       * @param { Object } config.params - Les paramètres de la requête
       * @param { string } config.params.id - id
       * @returns { Promise<DeleteMediaModel> } - Un modèle de type DeleteMediaModel
       *
       * @param {string} authorization -  (header)
       */
      async execute(config) {
      const{ context } = config
        if (!this.hasAccess(context.userRoles)) 
          throw new Error('Access denied: insufficient permissions');

        const response = await this.fetchData(config);

        const data = await response.json();

        // Gérer les différentes réponses en fonction des codes de statut
        
        if (response.status === 204) {
    
        if(!config.noModel) {
            if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, DeleteMediaModel));
        } else {
          return this.bindModel(data, DeleteMediaModel);
        }
        } else {
          return data;
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  