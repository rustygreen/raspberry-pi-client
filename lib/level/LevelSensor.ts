export interface AveragingOptions {
  /** The number of sensing requests to make. */
  sampleSize: number;
  /** Number of milliseconds to delay between sensing requests. */
  delayMilliseconds: number;
}

export interface WaitForLevelOptions extends Partial<AveragingOptions> {
  targetLevel: number;
}

export interface LevelSensor {
  get fullLevel(): number;
  getLevel(): Promise<number>;
  getLevelAveraged(options?: Partial<AveragingOptions>): Promise<number>;
  waitUntilFull(
    averagingOptions?: Partial<AveragingOptions>,
    millisecondsDelay?: number
  ): Promise<number>;
}
