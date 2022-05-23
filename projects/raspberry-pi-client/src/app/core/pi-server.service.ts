// Angular.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 3rd party.
import { map, Observable, tap } from 'rxjs';

// Local.
import { AppStateService } from './app-state.service';
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';

@Injectable({
  providedIn: 'root'
})
export class PiServerService {
  get piServerUrl(): string {
    return this.appState.activePiServer.value?.url || '';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly appState: AppStateService
  ) {}

  getPins(): Observable<GpioPin[]> {
    return this.http
      .get<GpioPin[]>(`${this.piServerUrl}/pins`)
      .pipe(tap(pins => ensureTitle(pins)));
  }

  setPin(pin: number, value: GpioPinValue): Observable<void>;
  setPin(pin: GpioPin): Observable<void>;
  setPin(pin: GpioPin | number, value?: GpioPinValue): Observable<void> {
    const isPinNumber = Number.isInteger(pin);
    const pinNumber: number = isPinNumber
      ? (pin as number)
      : (pin as GpioPin).pin;

    value = isPinNumber ? value : (pin as GpioPin).value;

    return this.http
      .get(`${this.piServerUrl}/${pinNumber}/${value}`)
      .pipe(map(() => {}));
  }
}

function ensureTitle(pins: GpioPin[]): void {
  pins.forEach(p => {
    p.title = p.title || `Pin ${p.pin}`;
  });
}
