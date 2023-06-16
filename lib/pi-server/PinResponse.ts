import { GpioPinValue } from "../pins/GpioPinValue";

export interface PinResponse {
  pin: number;
  value: GpioPinValue;
  name?: string;
  lastValue?: number;
  lastChange?: Date;
}
