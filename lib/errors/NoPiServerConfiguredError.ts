export class NoPiServerConfiguredError extends Error {
  constructor(message = "No Pi server configured") {
    super(message);
  }
}
