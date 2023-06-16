import { PiServerOptions } from "../pi-server/PiServerOptions";

export interface PiServerSafetyCheck extends PiServerOptions {
  pins: number[];
  maxOnTimeMinutes: number;
  normalState: number;
  requestRetries?: number;
  requestRetryDelaySeconds?:number;
}
