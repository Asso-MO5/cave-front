
    import { ApiService } from './utils/ApiService.mjs';
    import { Item } from './Item.mjs';

    /**
     * Permet de lier un jeu à une machine
     * @class PutMachineMachine_idGameRef_idService
     * @roles reviewer, publisher
     */
    export class PutMachineMachine_idGameRef_idService extends ApiService {
      constructor(baseURL) {
        super(baseURL);
        this.roles = ["reviewer","publisher"];
        this.verb = 'PUT';
        this.endpoint = '/machine/{machine_id}/game/{ref_id}';
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
       * @description Permet de lier un jeu à une machine
       * @roles reviewer, publisher
       * 
       * @param { Object } config - Les paramètres de la requête
       * @param { Object } config.context - Contexte (cookies en SSR, localStorage côté client)
       * @param { boolean } config.ssr - True si la requête est effectuée côté serveur
       *
       * @param { Object } config.params - Les paramètres de la requête
       * @param { string } config.params.machine_id - machine_id
       * @param { string } config.params.ref_id - ref_id
       * @returns { Promise<Item> } - Un modèle de type Item
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
        
        if (response.status === 200) {
        if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Item));
        } else {
          return this.bindModel(data, Item);
        }
        }
      
        if (response.status === 201) {
        if(Array.isArray(data)) {
          return data.map(item => this.bindModel(item, Item));
        } else {
          return this.bindModel(data, Item);
        }
        }
      

        throw new Error(`Unexpected response status: ${response.status}`);
      }
    }
  