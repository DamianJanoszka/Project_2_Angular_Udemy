import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',
  loadChildren: () => import('./recipes/recipes.module')
  .then(m=>m.RecipesModule)}, //load only the content if the user visits the path
  { path: 'shopping-list',
    loadChildren: () => import ('./shopping-list/shopping-list.module')
    .then(m=>m.ShoppingListModule)},
  { path: 'auth',
    loadChildren: () => import ('./auth/auth.module')
    .then(m=>m.AuthModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
