import { PiServerOptions } from "../pi-server/PiServerOptions";

export interface AppConfigProperties {
  servers: PiServerOptions[];
  recipes: any[];
  pinSkeletonCount: number;
}
