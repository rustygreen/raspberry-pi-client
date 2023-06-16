import { DrainAveragingOptions } from "./DrainAveragingOptions";
import { PiServerOptions } from "../pi-server/PiServerOptions";
import { LevelSensorOptions } from "../level/createLevelSensor";

export interface DrainOptions extends PiServerOptions {
  additionalDrainSeconds: number;
  valves: {
    supplyPin: number;
    drainPin: number;
    targetPin: number;
  };
  levelSensor: LevelSensorOptions;
  averaging?: DrainAveragingOptions;
  maxRunMinutes?: number;
}
