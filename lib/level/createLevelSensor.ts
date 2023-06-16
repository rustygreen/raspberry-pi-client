import { LevelSensor } from "./LevelSensor";
import { LevelSensorType } from "./LevelSensorType";
import {
  HCSR04Sensor,
  HCSR04Options
} from "./HCSR04Sensor";

export type LevelSensorOptions = HCSR04Options;

export function createLevelSensor(options: LevelSensorOptions): LevelSensor {
  switch (options.type) {
    case LevelSensorType.Hcsr04:
      return new HCSR04Sensor(options);
    default:
      throw new Error(`Unknown level sensor supplied (type '${options.type}')`);
  }
}
