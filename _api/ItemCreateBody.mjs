import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class ItemCreateBody
 * @description Classe représentant une réponse de type ItemCreateBody.
 */
export class ItemCreateBody extends BaseModel {
  /**
   * @param {string} type
   * @param {string} name
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.type = props.type || null;
    /** @type {string} */
    this.name = props.name || null;
  }

  /** @type {string} */
  get type() { return this._type; }
  set type(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for type');
    this._type = value;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for name');
    this._name = value;
  }

}
