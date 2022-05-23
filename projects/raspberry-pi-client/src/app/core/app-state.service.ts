// Angular.
import { Injectable } from '@angular/core';

// 3rd party.
import { BehaviorSubject } from 'rxjs';

// Local.
import { PiServer } from '../shared/pi-server';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  piServers = new BehaviorSubject<PiServer[]>([]);
  activePiServer = new BehaviorSubject<PiServer | undefined>({
    name: 'Pi Server',
    url: 'https://pi-basement.rusty.green'
  });

  get hasActiveService(): boolean {
    return Boolean(this.activePiServer.value);
  }

  get hasServices(): boolean {
    return Boolean(this.piServers.value.length);
  }
}
