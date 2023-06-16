import { ActionStatus } from "../ActionStatus";

export enum DrainState {
  Unknown = "unknown",
  Skipped = "skipped",
  Started = "started",
  Filling = "filling",
  Filled = "filled",
  Draining = "draining",
  Drained = "drained",
  Completed = "completed",
  Failed = "failed"
}

export interface DrainStatus extends ActionStatus {
  state: DrainState;
  startLevel?: number;
  endLevel?: number;
}
