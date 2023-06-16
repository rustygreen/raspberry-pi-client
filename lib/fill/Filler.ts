import { wait } from "../wait";
import { randomUUID } from "crypto";
import { Logger } from "../logging/Logger";
import { PiServer } from "../pi-server/PiServer";
import { LevelSensor } from "../level/LevelSensor";
import { GpioPinValue } from "../pins/GpioPinValue";
import { FillState, FillStatus } from "./FillStatus";
import { createLogger } from "../logging/createLogger";
import { FillOptions as FillOptions } from "./FillOptions";
import { createPiServer } from "../pi-server/createPiServer";
import { minutesToMilliseconds } from "../conversion/minutesToMilliseconds";
import { millisecondsToMinutes } from "../conversion/millisecondsToMinutes";
import {
  LevelSensorOptions,
  createLevelSensor
} from "../level/createLevelSensor";

const DEFAULT_OPTIONS: Partial<FillOptions> = {
  maxRunMinutes: 20,
  averaging: {
    enabled: true
  }
};

export class Filler {
  readonly id = randomUUID();
  readonly options: FillOptions;
  readonly status: FillStatus = {
    id: this.id,
    state: FillState.Unknown,
    percentComplete: 0
  };

  private maxRunTimeTimeoutId: NodeJS.Timeout | undefined;
  private readonly levelSensor: LevelSensor;
  private readonly log: Logger = createLogger("Filler");
  private readonly piServer: PiServer;

  private get operationalPins(): number[] {
    return [
      this.options.valves.drainPin,
      this.options.valves.supplyPin,
      this.options.valves.supplyPin
    ];
  }

  constructor(options: FillOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    const sensorOptions: LevelSensorOptions = {
      ...this.options.levelSensor
    };

    this.piServer = createPiServer(options);
    this.levelSensor = createLevelSensor(sensorOptions);
  }

  async fill(): Promise<void> {
    const start = new Date();
    try {
      let skipRun = await this.skipIfAlreadyRunning();
      if (skipRun) {
        return;
      }

      this.status.startLevel = await this.getLevel();
      skipRun = await this.skipIfAlreadyFull();
      if (skipRun) {
        return;
      }

      this.log.info(`Starting fill process for ID ${this.id}`);
      await this.setup();
      await this.turnOnSupplyValves();
      await this.waitForFull();
      await this.drainPipes();
      await this.setStateComplete();
      const elapsed = millisecondsToMinutes(
        new Date().getTime() - start.getTime()
      );
      this.log.info(
        `Successfully completed fill process for ID '${this.id}' in ${elapsed} minutes`
      );
    } catch (exception) {
      const error = exception as Error;
      this.setStateFail(error);
      this.log.error(`Failed to run filler '${this.id}'`, error);
    } finally {
      await this.end();
      const elapsed = millisecondsToMinutes(
        new Date().getTime() - start.getTime()
      );

      const result = JSON.stringify(this.status);
      this.log.info(
        `Process with ID '${this.id}' ended in ${elapsed} minutes. With result: \n${result}`
      );
    }
  }

  abort(): Promise<void> {
    this.log.error(`Aborting water filler '${this.id}'`);
    this.end();
    throw new Error(`Water filler '${this.id}' aborted.`);
  }

  private trySetMaxTimeoutCancellation(): boolean {
    if (!this.options.maxRunMinutes) {
      return false;
    }

    const maxRunMilliseconds = minutesToMilliseconds(
      this.options.maxRunMinutes
    );
    this.maxRunTimeTimeoutId = setTimeout(
      () => this.abort(),
      maxRunMilliseconds
    );

    return true;
  }

  private async setup(): Promise<void> {
    if (this.status.startTime) {
      throw new Error(
        `Water filler '${this.id}' has already started. Cannot start again.`
      );
    }

    this.status.startTime = new Date();
    this.applyState(FillState.Started);
    this.trySetMaxTimeoutCancellation();
  }

  private async skipIfAlreadyRunning(): Promise<boolean> {
    const pins = await this.piServer.getPins();
    const operationalPins = this.operationalPins;
    const pinIsAlreadyOn = pins
      .filter((p) => operationalPins.includes(p.pin))
      .some((p) => p.value);

    if (pinIsAlreadyOn) {
      this.log.info(
        `Skipping run due to valves already on (another process running)`
      );
      this.setStateSkipped();
    }

    return pinIsAlreadyOn;
  }

  private async skipIfAlreadyFull(): Promise<boolean> {
    const startLevel = this.status.startLevel as number;
    const isFull = startLevel <= this.levelSensor.fullLevel;

    if (isFull) {
      this.log.info(`Skipping run due to level already full`);
      this.setStateSkipped();
    }

    return isFull;
  }

  private async turnOnSupplyValves(): Promise<void> {
    const targetPin = this.options.valves.targetPin;
    const supplyPin = this.options.valves.supplyPin;
    const supplyValvePins = [targetPin, supplyPin];
    const pinsMessage = `pins: ${supplyValvePins.join(", ")}`;
    this.log.debug(`Turning on supply valves (${pinsMessage})`);
    this.applyState(FillState.Filling);

    await this.piServer.setPin(targetPin, GpioPinValue.On);
    await this.piServer.setPin(supplyPin, GpioPinValue.On);

    this.log.debug(`Finished turning on supply valves (${pinsMessage})`);
  }

  private async waitForFull(): Promise<void> {
    this.log.debug(`Waiting for full level`);
    this.applyState(FillState.Filling);

    const averaging = this.options.averaging;
    this.status.endLevel = await this.levelSensor.waitUntilFull(averaging);

    this.applyState(FillState.Filled);
    this.log.debug(`Completed filling`);
  }

  private async drainPipes(): Promise<void> {
    this.log.debug(`Draining pipes`);
    this.applyState(FillState.Draining);
    await this.piServer.setPin(this.options.valves.supplyPin, GpioPinValue.Off);
    await this.piServer.setPin(this.options.valves.targetPin, GpioPinValue.On);
    await this.piServer.setPin(this.options.valves.drainPin, GpioPinValue.On);

    const milliseconds = minutesToMilliseconds(this.options.drainTimeMinutes);
    await wait(milliseconds);
    this.applyState(FillState.Drained);

    await this.piServer.setPin(this.options.valves.targetPin, GpioPinValue.Off);
    await this.piServer.setPin(this.options.valves.drainPin, GpioPinValue.Off);
    this.log.debug(`Finished draining pipes`);
  }

  private async turnOffAllValves(): Promise<void> {
    for (const pin of this.operationalPins) {
      await this.piServer.setPin(pin, GpioPinValue.Off);
    }

    this.log.debug(`Turned off all valves (${this.operationalPins.length})`);
  }

  private async tryDrainPipes(): Promise<void> {
    const failed =
      this.status.state !== FillState.Skipped &&
      this.status.state !== FillState.Drained &&
      this.status.state !== FillState.Completed;

    if (failed) {
      this.log.warn("Draining pipes because process did not run as expected");
      await this.drainPipes();
    }
  }

  private async setStateComplete(): Promise<void> {
    this.applyState(FillState.Completed);
    this.status.percentComplete = 100;
  }

  private async setStateSkipped(): Promise<void> {
    this.applyState(FillState.Skipped);
    this.status.percentComplete = 100;
  }

  private async end(): Promise<void> {
    if (this.maxRunTimeTimeoutId) {
      clearTimeout(this.maxRunTimeTimeoutId);
    }

    await this.tryDrainPipes();
    await this.turnOffAllValves();
    this.status.endTime = new Date();
    this.status.endLevel = await this.getLevel();
  }

  private setStateFail(error: Error): void {
    this.applyState(FillState.Failed);
    this.status.error = error;
  }

  private applyState(state: FillState): void {
    const completedStates = [
      FillState.Completed,
      FillState.Failed,
      FillState.Skipped
    ];

    const isComplete = completedStates.includes(this.status.state);
    if (!isComplete) {
      this.status.state = state;
    }
  }

  private getLevel(): Promise<number> {
    const useAveraging = this.options.averaging?.enabled;
    return useAveraging
      ? this.levelSensor.getLevelAveraged(this.options.averaging)
      : this.levelSensor.getLevel();
  }
}
