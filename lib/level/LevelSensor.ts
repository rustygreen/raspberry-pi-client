import { wait } from "../wait";
import { Logger } from "../logging/Logger";
import { KeyValuePair } from "../KeyValuePair";
import { PiServer } from "../pi-server/PiServer";
import { createLogger } from "../logging/createLogger";
import { LevelSensorResponse } from "./LevelSensorResponse";
import { createPiServer } from "../pi-server/createPiServer";
import { getTrimmedAverage } from "../stats/getTrimmedAverage";

export interface BaseLevelOptions {
  serverUrl: string;
  type: string;
  fullLevel?: number;
  emptyLevel?: number;
  capacityGallons?: number;
  retryCount?: number;
  retryWait?: number;
}

export interface AveragingOptions {
  /** The number of sensing requests to make. */
  sampleSize: number;
  /** Number of milliseconds to delay between sensing requests. */
  delayMilliseconds: number;
}

export interface WaitForLevelOptions extends Partial<AveragingOptions> {
  targetLevel: number;
}

interface ConstructorOptions extends BaseLevelOptions {
  endpointPath: string;
  queryParams?: KeyValuePair;
}

const DEFAULT_AVERAGING_OPTIONS: AveragingOptions = {
  sampleSize: 5,
  delayMilliseconds: 1000
};

export abstract class LevelSensor {
  readonly piServer: PiServer;
  readonly log: Logger;
  readonly sensorEndpoint: string;

  get fullLevel(): number {
    return this.options.fullLevel as number;
  }

  constructor(protected readonly options: ConstructorOptions) {
    this.sensorEndpoint = `sensors/${this.options.type}`;
    this.piServer = createPiServer(options);
    this.log = createLogger(`LevelSensor(${options.type})`);
  }

  async getLevel(): Promise<number> {
    const endpoint = `${this.sensorEndpoint}/${this.options.endpointPath}`;
    const { retryCount, retryWait } = this.options;
    try {
      const response: LevelSensorResponse = await this.piServer.requestJson({
        endpoint,
        retryCount,
        retryWait
      });

      return response.distance;
    } catch (error) {
      this.log.error(
        `Failed to get level at endpoint: '${endpoint}' (retryCount: ${retryCount} retryWait: ${retryWait})`
      );
      throw error;
    }
  }

  async getLevelAveraged(options?: Partial<AveragingOptions>): Promise<number> {
    const averageOptions = { ...DEFAULT_AVERAGING_OPTIONS, ...options };
    const sampleSizeItems = new Array(averageOptions.sampleSize);
    const delayMilliseconds = averageOptions.delayMilliseconds;
    const sampleSizeEntries = sampleSizeItems.entries();
    const levels: number[] = [];

    for (const [index] of sampleSizeEntries) {
      const level = await this.getLevel();
      const isNotLast = index !== sampleSizeItems.length - 1;
      levels.push(level);

      if (isNotLast) {
        await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
      }
    }

    return getTrimmedAverage(levels);
  }

  async isFull(averagingOptions?: Partial<AveragingOptions>): Promise<boolean> {
    const level = await this.getLevelAveraged(averagingOptions);
    const fullLevel = this.options.fullLevel as number;
    return level >= fullLevel;
  }

  async waitUntilFull(
    averagingOptions?: Partial<AveragingOptions>,
    millisecondsDelay = 1000
  ): Promise<number> {
    const fullLevel = this.options.fullLevel as number;
    const missingFullLevel = !fullLevel && fullLevel !== 0;

    if (missingFullLevel) {
      throw new Error(
        "Unable to wait for sensor full level. No full level value supplied."
      );
    }

    // TODO: Add logic that checks if full value is less than empty
    // value, and reverse logic accordingly - @russell.green
    try {
      let level = await this.getLevelAveraged(averagingOptions);
      while (level >= fullLevel) {
        this.log.debug(
          `Waiting for level ${level} to be less than ${fullLevel}...`
        );
        await wait(millisecondsDelay);
        level = await this.getLevelAveraged(averagingOptions);
      }

      return level;
    } catch (error) {
      this.log.error(`Failed while waiting for level to reach <= ${fullLevel}`);
      throw error;
    }
  }
}
