// Angular.
import { Injectable } from '@angular/core';

// 3rd party.
import { map, Observable, of } from 'rxjs';

// Local.
import { PiServer } from '../shared/pi-server';
import { PiServerStorage } from '../shared/pi-server-storage';

const LOCAL_STORAGE_KEY = 'raspberry-pi-client::servers';

@Injectable({
  providedIn: 'root'
})
export class PiServerLocalStorage extends PiServerStorage {
  findAll(): Observable<PiServer[]> {
    return of(this.getServicesFromStorage());
  }

  findByUrl(url: string): Observable<PiServer | undefined> {
    return this.findByAttribute('url', url);
  }

  findByName(url: string): Observable<PiServer | undefined> {
    return this.findByAttribute('name', url);
  }

  remove(server: PiServer): Observable<boolean>;
  remove(url: string): Observable<boolean>;
  remove(serverOrUrl: PiServer | string): Observable<boolean> {
    const current = this.getServicesFromStorage();
    const urlToRemove =
      typeof serverOrUrl === 'string'
        ? (serverOrUrl as string)
        : (serverOrUrl as PiServer).url;

    const remaining = current.filter(server => server.url === urlToRemove);
    this.saveServicesToStorage(remaining);

    const didChange = current.length !== remaining.length;
    return of(didChange);
  }

  add(server: PiServer): Observable<void> {
    const current = this.getServicesFromStorage();
    current.push(server);
    this.saveServicesToStorage(current);

    return of(undefined);
  }

  private saveServicesToStorage(servers: PiServer[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(servers));
  }

  private getServicesFromStorage(): PiServer[] {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storage ? (JSON.parse(storage) as PiServer[]) : [];
  }

  private findByAttribute(
    key: keyof PiServer,
    matchValue: string
  ): Observable<PiServer | undefined> {
    return this.findAll().pipe(
      map(servers => servers.find(server => isMatch(server, key, matchValue)))
    );
  }
}

function isMatch(
  server: PiServer,
  key: keyof PiServer,
  matchValue: string
): boolean {
  const serverValue = server[key].toLowerCase();
  return serverValue === matchValue;
}
