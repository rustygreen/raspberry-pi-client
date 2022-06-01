import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from './header-toolbar.component';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HeaderToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    TabViewModule,
    MenubarModule,
    DropdownModule
  ],
  exports: [HeaderToolbarComponent]
})
export class HeaderToolbarModule {}
