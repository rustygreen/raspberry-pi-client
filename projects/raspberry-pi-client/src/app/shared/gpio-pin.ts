export enum GpioPinValue {
  Low = 0,
  High = 1
}

export interface GpioPin {
  pin: number;
  value: GpioPinValue;
  title?: string | undefined | null;
}
