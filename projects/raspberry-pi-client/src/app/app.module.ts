import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RippleModule } from 'primeng/ripple';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderToolbarModule } from './header-toolbar/header-toolbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RippleModule,
    AppRoutingModule,
    HeaderToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
