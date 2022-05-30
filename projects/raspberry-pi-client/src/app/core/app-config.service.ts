// Angular.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 3rd party.
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';

// Local.
import { PiServer } from '../shared/pi-server';
import { AppConfig } from '../shared/app-config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  readonly ready: Promise<void>;

  config = new BehaviorSubject<AppConfig>({
    servers: []
  });
  activeServer = new BehaviorSubject<PiServer | null>(null);

  servers: Observable<PiServer[]>;

  get hasActiveServer(): boolean {
    return Boolean(this.activeServer.value);
  }

  get hasServices(): boolean {
    return Boolean(this.config.value.servers.length);
  }

  constructor(private readonly http: HttpClient) {
    this.servers = this.config.pipe(map(c => c.servers));

    this.ready = new Promise<void>(resolve => {
      this.config.subscribe(config => {
        const active =
          config.servers.find(s => s.active) || config.servers[0] || null;
        this.activeServer.next(active);

        resolve();
      });
    });
  }

  load(): Promise<void> {
    const source = this.http
      .get<AppConfig>(environment.configUri)
      .pipe(map(config => this.config.next(config)));

    return lastValueFrom(source);
  }
}
