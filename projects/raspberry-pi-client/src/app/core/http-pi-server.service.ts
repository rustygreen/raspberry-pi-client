// Angular.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 3rd party.
import { map, Observable, tap } from 'rxjs';

// Local.
import { AppConfigService } from './app-config.service';
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';
import { PiServerService } from '../shared/pi-server-service';

@Injectable({
  providedIn: 'root'
})
export class HttpPiServerService extends PiServerService {
  constructor(appConfig: AppConfigService, private readonly http: HttpClient) {
    super(appConfig);
  }

  protected getPinValues(): Observable<GpioPin[]> {
    return this.http.get<GpioPin[]>(`${this.piServerUrl}/pins`);
  }

  protected setPinValue(pin: number, value: GpioPinValue): Observable<void> {
    return this.http
      .get(`${this.piServerUrl}/pins/${pin}/${value}`)
      .pipe(map(() => {}));
  }
}
