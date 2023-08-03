import { wait } from "../wait";
import { Logger } from "../logging/Logger";
import { PiServer } from "../pi-server/PiServer";
import { LevelSensorType } from "./LevelSensorType";
import { GpioPinValue } from "../pins/GpioPinValue";
import { createLogger } from "../logging/createLogger";
import { createPiServer } from "../pi-server/createPiServer";
import { AveragingOptions, LevelSensor } from "./LevelSensor";

export interface DP5200Options {
  serverUrl: string;
  type: LevelSensorType.Dp5200;
  readPin: number;
  fullIndicatorValue: GpioPinValue;
  retryCount?: number;
  retryWait?: number;
}

export class DP5200Sensor implements LevelSensor {
  readonly piServer: PiServer;
  readonly log: Logger;

  constructor(readonly options: DP5200Options) {
    this.piServer = createPiServer(options);
    this.log = createLogger(`LevelSensor(${options.type})`);
  }

  async getLevel(): Promise<number> {
    const value = await this.piServer.getPin(this.options.readPin);
    return value === this.options.fullIndicatorValue ? 1 : 0;
  }

  getLevelAveraged(
    options?: Partial<AveragingOptions> | undefined
  ): Promise<number> {
    return this.getLevel();
  }

  async waitUntilFull(
    averagingOptions?: Partial<AveragingOptions> | undefined,
    millisecondsDelay = 1000
  ): Promise<number> {
    try {
      let level = await this.getLevelAveraged(averagingOptions);
      while (level < 1) {
        this.log.debug(`Waiting for level ${level} to equal 1`);

        await wait(millisecondsDelay);
        level = await this.getLevelAveraged(averagingOptions);
      }

      this.log.debug(`Level reached`);
      return level;
    } catch (error) {
      this.log.error(`Failed while waiting for level to reach 1`);
      throw error;
    }
  }
}
