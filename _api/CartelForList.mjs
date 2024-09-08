/**
 * @class CartelForList
 * @description Classe représentant une réponse de type CartelForList.
 */
export class CartelForList   {
  /**
   * @param {string} name
   * @param {string} slug
   * @param {string} type
   * @param {string} status
   */
  constructor(props = {}) {
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.slug = props.slug || null;
    /** @type {string} */
    this.type = props.type || null;
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

  /** @type {string} */
  get type() { return this._type; }
  set type(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for type');
    this._type = value;
  }

  /** @type {string} */
  get status() { return this._status; }
  set status(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for status');
    this._status = value;
  }

}
