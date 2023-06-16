export interface ActionStatus {
    id: string;
    percentComplete: number;
    startTime?: Date;
    endTime?: Date;
    error?: Error;
    message?: string;
  }