import { randomUUID } from "crypto";
import { Logger } from "../logging/Logger";
import { DrainOptions } from "./DrainOptions";
import { PiServer } from "../pi-server/PiServer";
import { LevelSensor } from "../level/LevelSensor";
import { createLogger } from "../logging/createLogger";
import { DrainState, DrainStatus } from "./DrainStatus";
import { createPiServer } from "../pi-server/createPiServer";
import {
  LevelSensorOptions,
  createLevelSensor
} from "../level/createLevelSensor";

const DEFAULT_OPTIONS: Partial<DrainOptions> = {
  maxRunMinutes: 20,
  averaging: {
    enabled: true
  }
};

export class Drainer {
  readonly id = randomUUID();
  readonly options: DrainOptions;
  readonly status: DrainStatus = {
    id: this.id,
    state: DrainState.Unknown,
    percentComplete: 0
  };

  private maxRunTimeTimeoutId: NodeJS.Timeout | undefined;
  private readonly levelSensor: LevelSensor;
  private readonly log: Logger = createLogger("Drainer");
  private readonly piServer: PiServer;

  constructor(options: DrainOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    const sensorOptions: LevelSensorOptions = {
      ...this.options.levelSensor
    };

    this.piServer = createPiServer(options);
    this.levelSensor = createLevelSensor(sensorOptions);
  }

  drain(): Promise<void> {
    throw new Error("Not implemented yet");
  }

  private getLevel(): Promise<number> {
    const useAveraging = this.options.averaging?.enabled;
    return useAveraging
      ? this.levelSensor.getLevelAveraged(this.options.averaging)
      : this.levelSensor.getLevel();
  }
}
