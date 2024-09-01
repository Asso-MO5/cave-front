import { BaseModel } from './utils/BaseModel.mjs'

/**
 * @class MediaCreateBody
 * @description Classe représentant une réponse de type MediaCreateBody.
 */
export class MediaCreateBody extends BaseModel {
  /**
   * @param {file} file
   * @param {string} url
   */
  constructor(props = {}) {
super(props);
    /** @type {file} */
    this.file = props.file || null;
    /** @type {string} */
    this.url = props.url || null;
  }

  /** @type {file} */
  get file() { return this._file; }
  set file(value) {
    if (typeof value !== 'file' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a file for file');
    this._file = value;
  }

  /** @type {string} */
  get url() { return this._url; }
  set url(value) {
    if (typeof value !== 'string' && (typeof value === 'null' || typeof value === 'undefined')) throw new TypeError('Expected a string for url');
    this._url = value;
  }

}
