/**
 * @class CompanyLight
 * @description Classe représentant une réponse de type CompanyLight.
 */
export class CompanyLight   {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} slug
   * @param {number} item_count
   * @param {string} activities
   */
  constructor(props = {}) {
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {number} */
    this.item_count = props.item_count || null;
    /** @type {string} */
    this.activities = props.activities || null;
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

  /** @type {number} */
  get item_count() { return this._item_count; }
  set item_count(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for item_count');
    this._item_count = value;
  }

  /** @type {string} */
  get activities() { return this._activities; }
  set activities(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for activities');
    this._activities = value;
  }

}
