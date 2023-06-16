import { delay } from "../delay";
import { clone } from "../clone";
import { PiServer } from "./PiServer";
import { GpioPin } from "../pins/GpioPin";
import { PinResponse } from "./PinResponse";
import { KeyValuePair } from "../KeyValuePair";
import { toPinResponse } from "./toPinResponse";
import { GpioPinValue } from "../pins/GpioPinValue";
import { PiServerOptions } from "./PiServerOptions";
import { PiServerRequestOptions } from "./PiServerRequestOptions";
import { NotImplementedError } from "../errors/NotImplementedError";

interface MockOnlyOptions {
  requestDelay?: number;
}

export interface MockPiServerOptions extends MockOnlyOptions, PiServerOptions {}

const DEFAULT_OPTIONS: MockOnlyOptions = {
  requestDelay: 500
};

export class MockPiServer implements PiServer {
  static MockGpioPins: GpioPin[] = [
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

  readonly options: MockPiServerOptions;
  readonly servicePinsMap: KeyValuePair<GpioPin[]> = {};

  get serverUrl(): string {
    return this.options.serverUrl;
  }

  get requestDelay(): number {
    return this.options.requestDelay || 0;
  }

  constructor(options: MockPiServerOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  getPins(): Promise<PinResponse[]> {
    const requestDelay = this.options.requestDelay || 0;
    const pins = this.getOrCreateServerPins();
    return this.delay(pins).then(toPinResponse(this.options));
  }

  getPin(pin: number): Promise<GpioPinValue> {
    const pins = this.getOrCreateServerPins();
    const result = pins.find((p) => p.pin === pin);
    if (!result) {
      throw new Error(`Unable to find pin ${pin}`);
    }

    return this.delay(result.value);
  }

  setPin(pin: number, value: GpioPinValue): Promise<GpioPinValue> {
    const pins = this.getOrCreateServerPins();
    const targetPin = pins.find((p) => p.pin === pin);

    if (!targetPin) {
      throw new Error(`Invalid pin '${pin}' supplied`);
    }

    targetPin.value = value;
    return this.delay(value);
  }

  requestJson<T>(options: PiServerRequestOptions): Promise<T> {
    throw new NotImplementedError();
  }

  requestNumber(options: PiServerRequestOptions): Promise<number> {
    throw new NotImplementedError();
  }

  request(options: PiServerRequestOptions): Promise<string> {
    throw new NotImplementedError();
  }

  private getOrCreateServerPins(): GpioPin[] {
    this.servicePinsMap[this.serverUrl] =
      this.servicePinsMap[this.serverUrl] || createMockPins();
    const mockPins = this.servicePinsMap[this.serverUrl];

    return mockPins;
  }

  private delay<T>(value: T): Promise<T> {
    return delay(value, this.requestDelay);
  }
}

function createMockPins(): GpioPin[] {
  return clone(MockPiServer.MockGpioPins);
}
