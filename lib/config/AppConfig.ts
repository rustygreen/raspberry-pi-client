import { Recipe } from "../recipes/Recipe";
import { DataTableSize } from "./DataTableSize";
import { PiServer } from "../pi-server/PiServer";
import { AppEvent, publish } from "../events/events";
import { AppConfigProperties } from "./AppConfigProperties";
import { createPiServer } from "../pi-server/createPiServer";
import { PiServerOptions } from "../pi-server/PiServerOptions";

export class AppConfig implements AppConfigProperties {
  dataTableSize = DataTableSize.Small;
  servers: PiServerOptions[] = [];
  recipes: Recipe[] = [];
  activeServer?: PiServer | undefined;
  pinSkeletonCount = 13;

  get isLoaded(): boolean {
    return Boolean(this.lastApply);
  }

  private lastApply: Date | undefined;

  apply(config: AppConfigProperties) {
    Object.assign(this, config);
    this.lastApply = new Date();

    this.clearActiveServerIfNotInList();
    const setDefaultServer = !this.activeServer && this.servers.length;

    if (setDefaultServer) {
      this.activeServer = createPiServer(this.servers[0]);
      publish(AppEvent.ConfigChange);
    }
  }

  private clearActiveServerIfNotInList(): void {
    if (!this.activeServer) {
      return;
    }

    const activeUrl = this.activeServer.serverUrl;
    const activeServerExists = this.servers.some(
      (s) => s.serverUrl === activeUrl
    );

    if (!activeServerExists) {
      this.activeServer = undefined;
    }
  }
}

export const CONFIG = new AppConfig();
