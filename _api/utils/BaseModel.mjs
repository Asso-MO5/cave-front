export class BaseModel {
  values = '__'
  constructor(props = {}) {}

  get obj() {
    return this.values
  }
}
