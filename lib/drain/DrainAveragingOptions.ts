import { AveragingOptions } from "../level/LevelSensor";

export interface DrainAveragingOptions extends Partial<AveragingOptions> {
    enabled: boolean;
  }