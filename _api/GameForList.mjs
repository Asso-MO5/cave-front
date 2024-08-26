import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class GameForList
 * @description Classe représentant une réponse de type GameForList.
 */
export class GameForList extends BaseModel {
  /**
   * @param {string} name
   * @param {string} slug
   * @param {number} release_year
   * @param {string} publisher
   * @param {string} developer
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
    this.publisher = props.publisher || null;
    /** @type {string} */
    this.developer = props.developer || null;
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
  get publisher() { return this._publisher; }
  set publisher(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for publisher');
    this._publisher = value;
  }

  /** @type {string} */
  get developer() { return this._developer; }
  set developer(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for developer');
    this._developer = value;
  }

}
