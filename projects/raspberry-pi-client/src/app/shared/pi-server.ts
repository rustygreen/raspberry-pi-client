import { KeyValuePair } from './key-value-pair';

export interface PiServer {
  name: string;
  url: string;
  active?: boolean;
  pinLabels?: KeyValuePair;
}
