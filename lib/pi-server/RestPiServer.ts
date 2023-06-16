import { wait } from "../wait";
import { PiServer } from "./PiServer";
import { Logger } from "../logging/Logger";
import { PinResponse } from "./PinResponse";
import { KeyValuePair } from "../KeyValuePair";
import { toPinResponse } from "./toPinResponse";
import { isNumber } from "../type-check/isNumber";
import { GpioPinValue } from "../pins/GpioPinValue";
import { PiServerOptions } from "./PiServerOptions";
import { createLogger } from "../logging/createLogger";
import {
  PiServerRequestOptions,
  ServerResponseFormat
} from "./PiServerRequestOptions";

type ResponseTypes = KeyValuePair | string | Blob | ArrayBuffer;

export class RestPiServer implements PiServer {
  readonly log: Logger;

  get serverUrl(): string {
    return this.options.serverUrl;
  }

  constructor(readonly options: PiServerOptions) {
    const nameExtra = options.name ? ` (${options.name})` : "";
    this.log = createLogger(`PiServer${nameExtra}`);
  }

  getPins(): Promise<PinResponse[]> {
    const endpoint = "pins";
    return this.requestJson<PinResponse[]>({ endpoint }).then(
      toPinResponse(this.options)
    );
  }

  getPin(pin: number): Promise<GpioPinValue> {
    const endpoint = `pins/${pin}`;
    return this.requestNumber({ endpoint });
  }

  async setPin(pin: number, value: GpioPinValue): Promise<GpioPinValue> {
    const endpoint = `pins/${pin}/${value}`;
    try {
      const result = await this.requestNumber({ endpoint });
      const didNotSet = result !== value;

      if (didNotSet) {
        throw new Error(
          `Failed to set pin #${pin} to value '${value}'. Returned value of '${result}'`
        );
      }

      return result;
    } catch (error) {
      this.log.error(`Failed to set pin value`, error as Error);
      throw error;
    }
  }

  requestJson<T>(options: PiServerRequestOptions): Promise<T> {
    return this.request({
      ...options,
      responseFormat: ServerResponseFormat.Json
    }) as Promise<T>;
  }

  async requestNumber(options: PiServerRequestOptions): Promise<number> {
    const value = await this.request(options);
    return parseInt(value);
  }

  // TODO: Change this method to use the re-usable "retry" function - @russell.green.
  async request<T extends ResponseTypes = string>(
    options: PiServerRequestOptions
  ): Promise<T> {
    const url = `${this.options.serverUrl}/${options.endpoint}`;
    const retryCount = options.retryCount as number;
    const canRetry = isNumber(options.retryCount);
    const noRetry = !canRetry;
    const retriesExhausted = canRetry && retryCount < 0;

    if (retriesExhausted) {
      this.throwExhausted(url);
    }

    try {
      this.log.trace(`Executing request '${url}'`);
      const result = await fetch(url);
      return toData(result, options.responseFormat) as Promise<T>;
    } catch (error) {
      if (noRetry) {
        this.log.error(`Failed to execute request '${url}'`, error as Error);
        throw error;
      }

      const newRetryCount = retryCount - 1;
      this.log.warn(
        `Failed to execute request '${url}'. Remaining retries: ${newRetryCount}`,
        error as Error
      );
      if (newRetryCount < 0) {
        this.throwExhausted(url);
      }

      await wait(options.retryWait || 0);
      const retryOptions = { ...options, retryCount: newRetryCount };
      return this.request(retryOptions);
    }
  }

  protected throwExhausted(url: string): void {
    const message = `Unable to execute request '${url}'. Allowed retries exhausted.`;
    this.log.error(message);
    throw new Error(message);
  }
}

function toData(
  response: Response,
  format: ServerResponseFormat.Json
): Promise<KeyValuePair>;
function toData(
  response: Response,
  format: ServerResponseFormat.Text
): Promise<string>;
function toData(
  response: Response,
  format: ServerResponseFormat.Blob
): Promise<Blob>;
function toData(
  response: Response,
  format: ServerResponseFormat.Json
): Promise<KeyValuePair>;
function toData(
  response: Response,
  format: ServerResponseFormat.ArrayBuffer
): Promise<ArrayBuffer>;
function toData(
  response: Response,
  format: ServerResponseFormat | null | undefined
): Promise<string>;
function toData(
  response: Response,
  format?: ServerResponseFormat | undefined | null
): Promise<ResponseTypes> {
  if (format === ServerResponseFormat.Json) {
    return response.json();
  } else if (format === ServerResponseFormat.Blob) {
    return response.blob();
  } else if (format === ServerResponseFormat.ArrayBuffer) {
    return response.arrayBuffer();
  } else {
    return response.text();
  }
}
