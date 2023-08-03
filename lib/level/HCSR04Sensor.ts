import { LevelSensorType } from "./LevelSensorType";
import { BaseLevelOptions, LevelSensorBase } from "./LevelSensorBase";

export interface HCSR04Options extends BaseLevelOptions {
  type: LevelSensorType.Hcsr04;
  echoPin: number;
  triggerPin: number;
}

export class HCSR04Sensor extends LevelSensorBase {
  constructor(options: HCSR04Options) {
    const endpointPath = `${options.triggerPin}/${options.echoPin}`;
    super({ ...options, endpointPath });
  }
}
