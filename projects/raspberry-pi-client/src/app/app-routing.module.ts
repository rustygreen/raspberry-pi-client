import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pins',
    loadChildren: () =>
      import('./pins-page/pins-page.module').then(m => m.PinsPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes-page/recipes-page.module').then(
        m => m.RecipesPageModule
      )
  },
  { path: '**', redirectTo: 'pins' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
