import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class ExpoForList
 * @description Classe représentant une réponse de type ExpoForList.
 */
export class ExpoForList extends BaseModel {
  /**
   * @param {string} name
   * @param {string} slug
   * @param {string} status
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {string} */
    this.status = props.status || null;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for name');
    this._name = value;
  }

  /** @type {string} */
  get slug() { return this._slug; }
  set slug(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for slug');
    this._slug = value;
  }

  /** @type {string} */
  get status() { return this._status; }
  set status(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for status');
    this._status = value;
  }

}
