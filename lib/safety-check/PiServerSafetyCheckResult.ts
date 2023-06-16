export interface PiServerSafetyCheckResult {
  errors?: Error[];
  safetyTriggered: boolean;
  triggered: { serverUrl: string; pin: number }[];
}
