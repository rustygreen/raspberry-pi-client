import { PinResponse } from "./PinResponse";
import { GpioPinValue } from "../pins/GpioPinValue";
import { PiServerRequestOptions } from "./PiServerRequestOptions";

export interface PiServer {
  readonly serverUrl: string;
  getPins(): Promise<PinResponse[]>;
  getPin(pin: number): Promise<GpioPinValue>;
  setPin(pin: number, value: GpioPinValue): Promise<GpioPinValue>;
  requestJson<T>(options: PiServerRequestOptions): Promise<T>;
  requestNumber(options: PiServerRequestOptions): Promise<number>;
  request(options: PiServerRequestOptions): Promise<string>;
}
