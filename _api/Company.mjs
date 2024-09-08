/**
 * @class Company
 * @description Classe représentant une réponse de type Company.
 */
export class Company   {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} slug
   * @param {string} country
   * @param {string} description
   * @param {string} borned_at
   * @param {string} logo_id
   * @param {string} logo_url
   * @param {string} activities
   * @param {string} author_id
   * @param {string} relation_type
   * @param {string} created_at
   * @param {string} updated_at
   */
  constructor(props = {}) {
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {string} */
    this.country = props.country || null;
    /** @type {string} */
    this.description = props.description || null;
    /** @type {string} */
    this.borned_at = props.borned_at || null;
    /** @type {string} */
    this.logo_id = props.logo_id || null;
    /** @type {string} */
    this.logo_url = props.logo_url || null;
    /** @type {string} */
    this.activities = props.activities || null;
    /** @type {string} */
    this.author_id = props.author_id || null;
    /** @type {string} */
    this.relation_type = props.relation_type || null;
    /** @type {string} */
    this.created_at = props.created_at || null;
    /** @type {string} */
    this.updated_at = props.updated_at || null;
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
  get country() { return this._country; }
  set country(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for country');
    this._country = value;
  }

  /** @type {string} */
  get description() { return this._description; }
  set description(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for description');
    this._description = value;
  }

  /** @type {string} */
  get borned_at() { return this._borned_at; }
  set borned_at(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for borned_at');
    this._borned_at = value;
  }

  /** @type {string} */
  get logo_id() { return this._logo_id; }
  set logo_id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for logo_id');
    this._logo_id = value;
  }

  /** @type {string} */
  get logo_url() { return this._logo_url; }
  set logo_url(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for logo_url');
    this._logo_url = value;
  }

  /** @type {string} */
  get activities() { return this._activities; }
  set activities(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for activities');
    this._activities = value;
  }

  /** @type {string} */
  get author_id() { return this._author_id; }
  set author_id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for author_id');
    this._author_id = value;
  }

  /** @type {string} */
  get relation_type() { return this._relation_type; }
  set relation_type(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for relation_type');
    this._relation_type = value;
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

}
