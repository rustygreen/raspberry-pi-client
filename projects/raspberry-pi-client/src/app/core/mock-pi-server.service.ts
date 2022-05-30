// Angular.
import { Injectable } from '@angular/core';

// 3rd party.
import { map, Observable, of, tap } from 'rxjs';

// Local.
import { MOCK_GPIO_PINS } from '../app.constants';
import { InvalidGpioPinError } from '../shared/errors';
import { AppConfigService } from './app-config.service';
import { KeyValuePair } from '../shared/key-value-pair';
import { GpioPin, GpioPinValue } from '../shared/gpio-pin';
import { PiServerService } from '../shared/pi-server-service';

@Injectable({
  providedIn: 'root'
})
export class MockPiServerService extends PiServerService {
  readonly servicePinsMap: KeyValuePair<GpioPin[]> = {};

  constructor(appConfig: AppConfigService) {
    super(appConfig);
  }

  protected getPinValues(): Observable<GpioPin[]> {
    const pins = this.getOrCreateServerPins();
    return of(pins).pipe(tap(pins => this.ensureTitle(pins)));
  }

  protected setPinValue(pin: number, value: GpioPinValue): Observable<void> {
    const pins = this.getOrCreateServerPins();
    const targetPin = pins.find(p => p.pin === pin);

    if (!targetPin) {
      throw new InvalidGpioPinError(pin);
    }

    targetPin.value = value;
    return of(null).pipe(map(() => {}));
  }

  private getOrCreateServerPins(): GpioPin[] {
    const url = this.appConfig.activeServer.value?.url || '';
    this.servicePinsMap[url] =
      this.servicePinsMap[url] || this.createMockPins();
    const mockPins = this.servicePinsMap[url];

    return mockPins;
  }

  private createMockPins(): GpioPin[] {
    return clone(MOCK_GPIO_PINS);
  }
}

function clone<T>(item: T): T {
  const json = JSON.stringify(item);
  return JSON.parse(json);
}
