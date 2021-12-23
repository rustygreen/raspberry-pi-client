import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { PinsListComponent } from './pins-list.component';

@NgModule({
  declarations: [PinsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    SkeletonModule,
    InputTextModule,
    InputSwitchModule,
    SelectButtonModule,
    ProgressSpinnerModule
  ],
  exports: [PinsListComponent]
})
export class PinsListModule {}
