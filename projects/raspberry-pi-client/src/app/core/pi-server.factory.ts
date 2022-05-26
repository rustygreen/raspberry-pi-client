import { Injector } from '@angular/core';
import { AppConfigService } from './app-config.service';

export async function PiServerFactory(
  configService: AppConfigService,
  injector: Injector
) {
  //await configService.ready;

  return configService.

  if (configService.authprovider === 'google') {
    return new GoogleAuthService(configService);
  }
  return new FacebookAuthService(oauthService, configService);
}
