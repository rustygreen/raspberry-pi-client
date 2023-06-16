import { AveragingOptions } from "../level/LevelSensor";

export interface FillAveragingOptions extends Partial<AveragingOptions> {
    enabled: boolean;
  }