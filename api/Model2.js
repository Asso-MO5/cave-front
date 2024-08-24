/**
 * @class Model2
 * @description Classe représentant une réponse de type Model2.
 */
export class Model2 {
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
   */
  constructor({id, name, slug, description, release_year, cover_id, cover_url, type, author_id, status, created_at, updated_at}) {
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

}
