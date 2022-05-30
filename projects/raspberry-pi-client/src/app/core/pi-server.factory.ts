// Angular.
import { Injector } from '@angular/core';

// Local.
import { AppConfigService } from './app-config.service';
import { PiServerService } from '../shared/pi-server-service';
import { HttpPiServerService } from './http-pi-server.service';
import { MockPiServerService } from './mock-pi-server.service';

export function PiServerFactory(
  configService: AppConfigService,
  injector: Injector
): PiServerService {
  return configService.config.value.mockServers
    ? injector.get<MockPiServerService>(MockPiServerService)
    : injector.get<HttpPiServerService>(HttpPiServerService);
}
