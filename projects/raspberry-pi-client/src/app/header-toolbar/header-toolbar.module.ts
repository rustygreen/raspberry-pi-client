import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from './header-toolbar.component';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [HeaderToolbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    TabViewModule,
    MenubarModule
  ],
  exports: [HeaderToolbarComponent]
})
export class HeaderToolbarModule {}
