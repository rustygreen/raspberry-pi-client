// Angular.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Local.
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiService {
  constructor(private readonly http: HttpClient) {}

  getPins(): Observable<GpioPin[]> {
    return this.http
      .get<GpioPin[]>('http://rasp-1:8080/pins')
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
      .get(`http://rasp-1:8080/pins/${pinNumber}/${value}`)
      .pipe(map(() => {}));
  }
}

function ensureTitle(pins: GpioPin[]): void {
  pins.forEach(p => {
    p.title = p.title || `Pin ${p.pin}`;
  });
}
