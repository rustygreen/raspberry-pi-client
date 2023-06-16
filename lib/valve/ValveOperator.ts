import { Logger } from "../logging/Logger";
import { PiServer } from "../pi-server/PiServer";
import { createLogger } from "../logging/createLogger";

export interface BaseValveOptions {
  serverUrl: string;
  type: string;
}

export abstract class ValveOperator {
  // readonly piServer: PiServer;
  readonly log: Logger;

  constructor(protected readonly options: BaseValveOptions) {
    // this.piServer = new PiServer(options);
    this.log = createLogger(`ValveOperator(${options.type})`);
  }

  async open(): Promise<void> {
    throw new Error("");
  }

  async close(): Promise<void> {
    throw new Error("");
  }
}
