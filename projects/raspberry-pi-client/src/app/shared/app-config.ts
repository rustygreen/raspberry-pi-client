// Local.
import { PiServer } from './pi-server';

export interface AppConfig {
  mockServers?: boolean;
  servers: PiServer[];
  skeletonCount?: number;
}
