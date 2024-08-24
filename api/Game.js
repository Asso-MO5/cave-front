import { Item } from './Item.js';
import { Company } from './Company.js';
import { Company } from './Company.js';
import { medias } from './medias.js';
/**
 * @class Game
 * @description Classe représentant une réponse de type Game.
 */
export class Game {
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
   * @param {string} ref_id
   * @param {Item} machine
   * @param {Company} developer
   * @param {Company} publisher
   * @param {medias} medias
   */
  constructor({id, name, slug, description, release_year, cover_id, cover_url, type, author_id, status, created_at, updated_at, ref_id, machine, developer, publisher, medias}) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.name = name;
    /** @type {string} */
    this.slug = slug;
    /** @type {string} */
    this.description = description;
    /** @type {number} */
    this.release_year = release_year;
    /** @type {string} */
    this.cover_id = cover_id;
    /** @type {string} */
    this.cover_url = cover_url;
    /** @type {string} */
    this.type = type;
    /** @type {string} */
    this.author_id = author_id;
    /** @type {string} */
    this.status = status;
    /** @type {string} */
    this.created_at = created_at;
    /** @type {string} */
    this.updated_at = updated_at;
    /** @type {string} */
    this.ref_id = ref_id;
    /** @type {Item} */
    this.machine = new Item(machine);
    /** @type {Company} */
    this.developer = new Company(developer);
    /** @type {Company} */
    this.publisher = new Company(publisher);
    /** @type {medias} */
    this.medias = new medias(medias);
  }

  /** @type {string} */
  get id() { return this._id; }
  set id(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for id');
    this._id = value;
  }

  /** @type {string} */
  get name() { return this._name; }
  set name(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for name');
    this._name = value;
  }

  /** @type {string} */
  get slug() { return this._slug; }
  set slug(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for slug');
    this._slug = value;
  }

  /** @type {string} */
  get description() { return this._description; }
  set description(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for description');
    this._description = value;
  }

  /** @type {number} */
  get release_year() { return this._release_year; }
  set release_year(value) {
    if (typeof value !== 'number') throw new TypeError('Expected a number for release_year');
    this._release_year = value;
  }

  /** @type {string} */
  get cover_id() { return this._cover_id; }
  set cover_id(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for cover_id');
    this._cover_id = value;
  }

  /** @type {string} */
  get cover_url() { return this._cover_url; }
  set cover_url(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for cover_url');
    this._cover_url = value;
  }

  /** @type {string} */
  get type() { return this._type; }
  set type(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for type');
    this._type = value;
  }

  /** @type {string} */
  get author_id() { return this._author_id; }
  set author_id(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for author_id');
    this._author_id = value;
  }

  /** @type {string} */
  get status() { return this._status; }
  set status(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for status');
    this._status = value;
  }

  /** @type {string} */
  get created_at() { return this._created_at; }
  set created_at(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for created_at');
    this._created_at = value;
  }

  /** @type {string} */
  get updated_at() { return this._updated_at; }
  set updated_at(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for updated_at');
    this._updated_at = value;
  }

  /** @type {string} */
  get ref_id() { return this._ref_id; }
  set ref_id(value) {
    if (typeof value !== 'string') throw new TypeError('Expected a string for ref_id');
    this._ref_id = value;
  }

  /** @type {Item} */
  get machine() { return this._machine; }
  set machine(value) {
    if (!(value instanceof Item)) throw new TypeError('Expected an instance of Item for machine');
    this._machine = value;
  }

  /** @type {Company} */
  get developer() { return this._developer; }
  set developer(value) {
    if (!(value instanceof Company)) throw new TypeError('Expected an instance of Company for developer');
    this._developer = value;
  }

  /** @type {Company} */
  get publisher() { return this._publisher; }
  set publisher(value) {
    if (!(value instanceof Company)) throw new TypeError('Expected an instance of Company for publisher');
    this._publisher = value;
  }

  /** @type {medias} */
  get medias() { return this._medias; }
  set medias(value) {
    if (!(value instanceof medias)) throw new TypeError('Expected an instance of medias for medias');
    this._medias = value;
  }

}
