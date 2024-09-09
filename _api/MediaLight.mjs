/**
 * @class MediaLight
 * @description Classe représentant une réponse de type MediaLight.
 */
export class MediaLight   {
  /**
   * @param {string} id
   * @param {string} url
   * @param {string} name
   * @param {string} type
   * @param {number} total_usage_count
   */
  constructor(props = {}) {
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.url = props.url || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.type = props.type || null;
    /** @type {number} */
    this.total_usage_count = props.total_usage_count || null;
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

  /** @type {number} */
  get total_usage_count() { return this._total_usage_count; }
  set total_usage_count(value) {
    if (typeof value !== 'number' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a number for total_usage_count');
    this._total_usage_count = value;
  }

}
