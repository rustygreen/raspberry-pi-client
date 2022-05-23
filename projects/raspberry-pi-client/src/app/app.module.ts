// Angular.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 3rd party.
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

// Local.
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { PiServerStorage } from './shared/pi-server-storage';
import { HeaderToolbarModule } from './header-toolbar/header-toolbar.module';
import { PiServerLocalStorage } from './core/pi-server-localstorage.service';
import { PiServersListModule } from './pi-servers-list/pi-servers-list.module';
import { ConnectPiServerModule } from './connect-pi-server/connect-pi-server.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RippleModule,
    AppRoutingModule,
    ConnectPiServerModule,
    DynamicDialogModule,
    PiServersListModule,
    HeaderToolbarModule
  ],
  providers: [
    {
      provide: PiServerStorage,
      // Switch out with your desired storage mechanism:
      useClass: PiServerLocalStorage
    },
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
