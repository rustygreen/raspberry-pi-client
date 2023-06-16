import { ActionStatus } from "../ActionStatus";

export enum FillState {
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

export interface FillStatus extends ActionStatus {
  state: FillState;
  startLevel?: number;
  endLevel?: number;
}
