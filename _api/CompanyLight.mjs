import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class CompanyLight
 * @description Classe représentant une réponse de type CompanyLight.
 */
export class CompanyLight extends BaseModel {
  /**
   * @param {number} id
   * @param {string} name
   * @param {string} activities
   */
  constructor(props = {}) {
super(props);
    /** @type {number} */
    this.id = props.id || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.activities = props.activities || null;
  }

  /** @type {number} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for id');
    this._id = value;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for name');
    this._name = value;
  }

  /** @type {string} */
  get activities() { return this._activities; }
  set activities(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for activities');
    this._activities = value;
  }

}
