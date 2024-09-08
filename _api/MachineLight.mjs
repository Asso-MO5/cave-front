/**
 * @class MachineLight
 * @description Classe représentant une réponse de type MachineLight.
 */
export class MachineLight   {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} related_item_id
   */
  constructor(props = {}) {
    /** @type {string} */
    this.id = props.id || null;
    /** @type {string} */
    this.name = props.name || null;
    /** @type {string} */
    this.related_item_id = props.related_item_id || null;
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
  get related_item_id() { return this._related_item_id; }
  set related_item_id(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for related_item_id');
    this._related_item_id = value;
  }

}
