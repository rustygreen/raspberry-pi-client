import { PiServer } from "./PiServer";
import { MockPiServer } from "./MockPiServer";
import { RestPiServer } from "./RestPiServer";
import { PiServerOptions } from "./PiServerOptions";

export function createPiServer(options: PiServerOptions): PiServer {
  if (!options.serverUrl) {
    throw new Error(`'serverUrl' is required`);
  }

  const isMock = options.serverUrl.startsWith("mock://");
  return isMock ? new MockPiServer(options) : new RestPiServer(options);
}
