export default class InvalidPayloadError extends Error {
  constructor() {
    super('You should send at least two addresses.');
    this.name = 'InvalidPayloadError';

    Object.setPrototypeOf(this, InvalidPayloadError.prototype);
  }
}
