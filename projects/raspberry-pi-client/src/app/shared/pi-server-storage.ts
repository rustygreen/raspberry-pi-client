// 3rd party.
import { Observable } from 'rxjs';

// Local.
import { PiServer } from './pi-server';

export abstract class PiServerStorage {
  abstract findAll(): Observable<PiServer[]>;
  abstract findByUrl(url: string): Observable<PiServer | undefined>;
  abstract findByName(url: string): Observable<PiServer | undefined>;
  abstract remove(server: PiServer): Observable<boolean>;
  abstract remove(url: string): Observable<boolean>;
  abstract remove(serverOrUrl: PiServer | string): Observable<boolean>;
  abstract add(server: PiServer): Observable<void>;
}
