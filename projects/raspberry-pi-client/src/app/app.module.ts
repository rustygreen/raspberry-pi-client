// Angular.
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 3rd party.
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

// Local.
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { PiServerFactory } from './core/pi-server.factory';
import { AppConfigService } from './core/app-config.service';
import { PiServerService } from './shared/pi-server-service';
import { HeaderToolbarModule } from './header-toolbar/header-toolbar.module';
import { PiServersListModule } from './pi-servers-list/pi-servers-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RippleModule,
    AppRoutingModule,
    DynamicDialogModule,
    PiServersListModule,
    HeaderToolbarModule
  ],
  providers: [
    DialogService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AppConfigService) => () => service.load(),
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: PiServerService,
      useFactory: PiServerFactory,
      deps: [AppConfigService, Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
