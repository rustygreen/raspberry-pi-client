import { LevelSensor } from "./LevelSensor";
import { LevelSensorType } from "./LevelSensorType";
import { HCSR04Sensor, HCSR04Options } from "./HCSR04Sensor";
import { DP5200Options, DP5200Sensor } from "./DP5200LevelSensor";

export type LevelSensorOptions = HCSR04Options | DP5200Options;

export function createLevelSensor(options: LevelSensorOptions): LevelSensor {
  const sensorType = options.type;
  switch (sensorType) {
    case LevelSensorType.Hcsr04: {
      return new HCSR04Sensor(options);
    }
    case LevelSensorType.Dp5200: {
      return new DP5200Sensor(options);
    }
    default:
      throw new Error(`Unknown level sensor supplied (type '${sensorType}')`);
  }
}
