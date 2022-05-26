// Angular.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 3rd party.
import { map, Observable, tap } from 'rxjs';

// Local.
import { MissingServerError } from '../shared/errors';
import { AppConfigService } from './app-config.service';
import { KeyValuePair } from '../shared/key-value-pair';
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';
import { PiServerService } from '../shared/pi-server-service';

@Injectable({
  providedIn: 'root'
})
export class HttpPiServerService extends PiServerService {
  constructor(appConfig: AppConfigService, private readonly http: HttpClient) {
    super(appConfig);
  }

  getPins(): Observable<GpioPin[]> {
    this.ensureServerConfigured();

    return this.http
      .get<GpioPin[]>(`${this.piServerUrl}/pins`)
      .pipe(tap(pins => this.ensureTitle(pins)));
  }

  setPin(pin: number, value: GpioPinValue): Observable<void>;
  setPin(pin: GpioPin): Observable<void>;
  setPin(pin: GpioPin | number, value?: GpioPinValue): Observable<void> {
    this.ensureServerConfigured();

    const isPinNumber = Number.isInteger(pin);
    const pinNumber: number = isPinNumber
      ? (pin as number)
      : (pin as GpioPin).pin;

    value = isPinNumber ? value : (pin as GpioPin).value;

    return this.http
      .get(`${this.piServerUrl}/pins/${pinNumber}/${value}`)
      .pipe(map(() => {}));
  }

  private ensureServerConfigured(): void {
    if (!this.appConfig.hasActiveServer) {
      throw new MissingServerError();
    }
  }

  private ensureTitle(pins: GpioPin[]): void {
    const pinLabels: KeyValuePair =
      this.appConfig.activeServer.value?.pinLabels || {};

    pins.forEach(p => {
      const title = pinLabels[String(p.pin)];
      p.title = title || p.title || `Pin ${p.pin}`;
    });
  }
}
