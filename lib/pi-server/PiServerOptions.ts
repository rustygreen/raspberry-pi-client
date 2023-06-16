import { KeyValuePair } from "../KeyValuePair";

export type PinLabels = KeyValuePair<string>;

export interface PiServerOptions {
  serverUrl: string;
  name?: string;
  pinLabels?: PinLabels;
  hideUnlabeled?: boolean;
}
