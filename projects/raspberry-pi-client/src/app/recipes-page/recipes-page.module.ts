import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesPageComponent } from './recipes-page.component';
import { RecipesListModule } from '../recipes-list/recipes-list.module';
import { RecipesPageRoutingModule } from './recipes-page-routing.module';

@NgModule({
  declarations: [RecipesPageComponent],
  imports: [CommonModule, RecipesListModule, RecipesPageRoutingModule]
})
export class RecipesPageModule {}
