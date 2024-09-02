import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class Media
 * @description Classe représentant une réponse de type Media.
 */
export class Media extends BaseModel {
  /**
   * @param {string} id
   * @param {string} url
   * @param {string} name
   * @param {string} type
   * @param {string} alt
   * @param {number} size
   * @param {string} description
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.url = props.url || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.type = props.type || null;
    /** @type {string} */
    this.alt = props.alt || null;
    /** @type {number} */
    this.size = props.size || null;
    /** @type {string} */
    this.description = props.description || null;
  }

  /** @type {string} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for id');
    this._id = value;
  }

  /** @type {string} */
  get url() { return this._url; }
  set url(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for url');
    this._url = value;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for name');
    this._name = value;
  }

  /** @type {string} */
  get type() { return this._type; }
  set type(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for type');
    this._type = value;
  }

  /** @type {string} */
  get alt() { return this._alt; }
  set alt(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for alt');
    this._alt = value;
  }

  /** @type {number} */
  get size() { return this._size; }
  set size(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for size');
    this._size = value;
  }

  /** @type {string} */
  get description() { return this._description; }
  set description(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for description');
    this._description = value;
  }

}
