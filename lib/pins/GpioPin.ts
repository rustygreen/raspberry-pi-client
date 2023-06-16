import { GpioPinValue } from "./GpioPinValue";

export interface GpioPin {
  pin: number;
  value: GpioPinValue;
  title?: string | undefined | null;
}
