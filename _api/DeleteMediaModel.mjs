/**
 * @class DeleteMediaModel
 * @description Classe représentant une réponse de type DeleteMediaModel.
 */
export class DeleteMediaModel   {
  /**
   * @param {string} message
   */
  constructor(props = {}) {
    /** @type {string} */
    this.message = props.message || null;
  }

  /** @type {string} */
  get message() { return this._message; }
  set message(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for message');
    this._message = value;
  }

}
