/**
 * @class CartelCreatePayload
 * @description Classe représentant une réponse de type CartelCreatePayload.
 */
export class CartelCreatePayload   {
  /**
   * @param {string} name
   * @param {string} type
   * @param {string} slug
   */
  constructor(props = {}) {
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.type = props.type || null;
    /** @type {string} */
    this.slug = props.slug || null;
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
  get slug() { return this._slug; }
  set slug(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for slug');
    this._slug = value;
  }

}
