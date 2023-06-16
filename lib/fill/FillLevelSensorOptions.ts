import { PiServerOptions } from "../pi-server/PiServerOptions";
import { LevelSensorOptions } from "../level/createLevelSensor";

export type FillLevelSensorOptions = Omit<
  LevelSensorOptions,
  keyof PiServerOptions
>;
