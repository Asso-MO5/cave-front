import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class CompanyCreateBody
 * @description Classe représentant une réponse de type CompanyCreateBody.
 */
export class CompanyCreateBody extends BaseModel {
  /**
   * @param {string} name
   * @param {string} activities
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.activities = props.activities || null;
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
