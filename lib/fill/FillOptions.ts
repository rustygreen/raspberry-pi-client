import { FillAveragingOptions } from "./FillAveragingOptions";
import { PiServerOptions } from "../pi-server/PiServerOptions";
import { LevelSensorOptions } from "../level/createLevelSensor";

export interface FillOptions extends PiServerOptions {
  drainTimeMinutes: number;
  valves: {
    supplyPin: number;
    drainPin: number;
    targetPin: number;
  };
  levelSensor: LevelSensorOptions;
  averaging?: FillAveragingOptions;
  maxRunMinutes?: number;
}
