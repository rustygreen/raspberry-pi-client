import { GpioPin } from './shared/gpio-pin';

export const DEFAULT_PINS_SKELETON_COUNT = 13;
export const APP_ERRORS = {
  NO_SERVER:
    'There is currently no active Pi server configured. Please supply a configuration: https://github.com/rustygreen/raspberry-pi-client#configuration',
  INVALID_PIN: 'Missing or invalid pin supplied'
};

export const MOCK_GPIO_PINS: GpioPin[] = [
  { pin: 7, value: 1 },
  { pin: 11, value: 0 },
  { pin: 12, value: 0 },
  { pin: 13, value: 0 },
  { pin: 15, value: 0 },
  { pin: 16, value: 0 },
  { pin: 18, value: 0 },
  { pin: 22, value: 0 },
  { pin: 29, value: 0 },
  { pin: 31, value: 0 },
  { pin: 33, value: 0 },
  { pin: 36, value: 0 },
  { pin: 37, value: 0 }
];
