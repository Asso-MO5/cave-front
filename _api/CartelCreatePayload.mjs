import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class CartelCreatePayload
 * @description Classe représentant une réponse de type CartelCreatePayload.
 */
export class CartelCreatePayload extends BaseModel {
  /**
   * @param {string} name
   * @param {string} id
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.id = props.id || null;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for name');
    this._name = value;
  }

  /** @type {string} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for id');
    this._id = value;
  }

}
