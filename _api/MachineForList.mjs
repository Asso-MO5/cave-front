import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class MachineForList
 * @description Classe représentant une réponse de type MachineForList.
 */
export class MachineForList extends BaseModel {
  /**
   * @param {string} name
   * @param {string} slug
   * @param {number} release_year
   * @param {string} manufacturer
   * @param {string} status
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {number} */
    this.release_year = props.release_year || null;
    /** @type {string} */
    this.manufacturer = props.manufacturer || null;
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

  /** @type {number} */
  get release_year() { return this._release_year; }
  set release_year(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for release_year');
    this._release_year = value;
  }

  /** @type {string} */
  get manufacturer() { return this._manufacturer; }
  set manufacturer(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for manufacturer');
    this._manufacturer = value;
  }

  /** @type {string} */
  get status() { return this._status; }
  set status(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for status');
    this._status = value;
  }

}
