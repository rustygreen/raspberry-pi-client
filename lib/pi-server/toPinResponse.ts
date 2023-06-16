import { PiServerOptions, PinLabels } from "./PiServerOptions";
import { PinResponse } from "./PinResponse";

type MapFunction = (response: PinResponse[]) => PinResponse[];

export function toPinResponse(options: PiServerOptions): MapFunction {
  return (pins: PinResponse[]) => {
    ensurePin(pins, options.pinLabels || {});

    if (options.hideUnlabeled) {
      return hideUnlabeled(pins, options.pinLabels || {});
    }

    return pins;
  };
}

function ensurePin(pins: PinResponse[], labels: PinLabels): void {
  pins.forEach((pin) => {
    const label = getLabel(pin.pin, labels);
    pin.name = pin.name || label || `Pin ${pin.pin}`;

    if (pin.lastChange) {
      pin.lastChange = new Date(pin.lastChange);
    }
  });
}

function hideUnlabeled(pins: PinResponse[], labels: PinLabels): PinResponse[] {
  return pins.filter((pin) => {
    const label = getLabel(pin.pin, labels);
    return Boolean(label);
  });
}

function getLabel(pin: number, labels: PinLabels): string | undefined {
  const pinId = String(pin);
  return labels[pinId];
}
