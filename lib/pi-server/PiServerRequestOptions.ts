import { RetryOptions } from "./RetryOptions";

export enum ServerResponseFormat {
  Json = "json",
  Text = "text",
  Blob = "blob",
  ArrayBuffer = "array-buffer"
}

export interface PiServerRequestOptions extends RetryOptions {
  endpoint?: string;
  responseFormat?: ServerResponseFormat;
}
