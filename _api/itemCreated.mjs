import { BaseModel } from './utils/BaseModel'

/**
 * @class itemCreated
 * @description Classe représentant une réponse de type itemCreated.
 */
export class itemCreated extends BaseModel {
  /**
   * @param {string} id
   * @param {string} slug
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.slug = props.slug || null;
  }

  /** @type {string} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for id');
    this._id = value;
  }

  /** @type {string} */
  get slug() { return this._slug; }
  set slug(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for slug');
    this._slug = value;
  }

}
