import { BaseModel } from './utils/BaseModel.mjs'

import { Company } from './Company.mjs';
import { Model4 } from './Model4.mjs';
/**
 * @class Model5
 * @description Classe représentant une réponse de type Model5.
 */
export class Model5 extends BaseModel {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} slug
   * @param {string} description
   * @param {number} release_year
   * @param {string} cover_id
   * @param {string} cover_url
   * @param {string} type
   * @param {string} author_id
   * @param {string} status
   * @param {string} created_at
   * @param {string} updated_at
   * @param {Company} manufacturer
   * @param {Model4} medias
   */
  constructor(props = {}) {
super(props);
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {string} */
    this.description = props.description || null;
    /** @type {number} */
    this.release_year = props.release_year || null;
    /** @type {string} */
    this.cover_id = props.cover_id || null;
    /** @type {string} */
    this.cover_url = props.cover_url || null;
    /** @type {string} */
    this.type = props.type || null;
    /** @type {string} */
    this.author_id = props.author_id || null;
    /** @type {string} */
    this.status = props.status || null;
    /** @type {string} */
    this.created_at = props.created_at || null;
    /** @type {string} */
    this.updated_at = props.updated_at || null;
    /** @type {Company} */
    this.manufacturer = new Company(manufacturer);
    /** @type {Model4} */
    this.medias = new Model4(medias);
  }

  /** @type {string} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for id');
    this._id = value;
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
  get description() { return this._description; }
  set description(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for description');
    this._description = value;
  }

  /** @type {number} */
  get release_year() { return this._release_year; }
  set release_year(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for release_year');
    this._release_year = value;
  }

  /** @type {string} */
  get cover_id() { return this._cover_id; }
  set cover_id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for cover_id');
    this._cover_id = value;
  }

  /** @type {string} */
  get cover_url() { return this._cover_url; }
  set cover_url(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for cover_url');
    this._cover_url = value;
  }

  /** @type {string} */
  get type() { return this._type; }
  set type(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for type');
    this._type = value;
  }

  /** @type {string} */
  get author_id() { return this._author_id; }
  set author_id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for author_id');
    this._author_id = value;
  }

  /** @type {string} */
  get status() { return this._status; }
  set status(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for status');
    this._status = value;
  }

  /** @type {string} */
  get created_at() { return this._created_at; }
  set created_at(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for created_at');
    this._created_at = value;
  }

  /** @type {string} */
  get updated_at() { return this._updated_at; }
  set updated_at(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for updated_at');
    this._updated_at = value;
  }

  /** @type {Company} */
  get manufacturer() { return this._manufacturer; }
  set manufacturer(value) {
    if (!(value instanceof Company && (typeof value === 'null' || typeof value === 'undefined'))) throw new TypeError('Expected an instance of Company for manufacturer');
    this._manufacturer = value;
  }

  /** @type {Model4} */
  get medias() { return this._medias; }
  set medias(value) {
    if (!(value instanceof Model4 && (typeof value === 'null' || typeof value === 'undefined'))) throw new TypeError('Expected an instance of Model4 for medias');
    this._medias = value;
  }

}
