import { retry } from "../retry";
import { Logger } from "../logging/Logger";
import { PiServer } from "../pi-server/PiServer";
import { PinResponse } from "../pi-server/PinResponse";
import { createLogger } from "../logging/createLogger";
import { PiServerSafetyCheck } from "./PiServerSafetyCheck";
import { createPiServer } from "../pi-server/createPiServer";
import { PiServerSafetyCheckResult } from "./PiServerSafetyCheckResult";
import { millisecondsToMinutes } from "../conversion/millisecondsToMinutes";

const log: Logger = createLogger("SafetyCheckRunner");
export async function runSafetyCheck(
  checks: PiServerSafetyCheck[]
): Promise<PiServerSafetyCheckResult> {
  const result: PiServerSafetyCheckResult = {
    safetyTriggered: false,
    triggered: []
  };

  for (const check of checks) {
    const piServer = createPiServer(check);
    const pins = await piServer.getPins();
    try {
      await checkPins({ piServer, pins, check, result });
    } catch (error) {
      log.error(`Failed to run check for server '${piServer.serverUrl}'`);
      result.errors = result.errors || [];
      result.errors.push(error as Error);
    }
  }

  return result;
}

async function checkPins(options: {
  piServer: PiServer;
  pins: PinResponse[];
  check: PiServerSafetyCheck;
  result: PiServerSafetyCheckResult;
}): Promise<void> {
  const { piServer, pins, check, result } = options;

  for (const pin of pins) {
    const isCheckPin = check.pins.includes(pin.pin);
    const isInCorrectState = pin.value === check.normalState;
    let shouldSkip = !isCheckPin || isInCorrectState;
    const checkChangeDate = !shouldSkip && pin.lastChange;

    if (checkChangeDate) {
      const lastChange = pin.lastChange as Date;
      const elapsedMilliseconds = new Date().getTime() - lastChange.getTime();
      const minutesOn = millisecondsToMinutes(elapsedMilliseconds);
      shouldSkip = minutesOn < check.maxOnTimeMinutes;
    }

    if (shouldSkip) {
      continue;
    }

    const serverUrl = piServer.serverUrl;
    const normalState = check.normalState || 0;
    log.warn(
      `Shutting off pin #${pin.pin} for server: '${serverUrl}', due to safety check`
    );

    const requestRetries = check.requestRetries ?? 3;
    const requestRetryDelaySeconds = check.requestRetryDelaySeconds ?? 5;
    const delayMs = requestRetryDelaySeconds * 1000;

    await retry(
      () => piServer.setPin(pin.pin, normalState),
      requestRetries,
      delayMs
    );

    result.safetyTriggered = true;
    result.triggered.push({ serverUrl, pin: pin.pin });
  }
}
