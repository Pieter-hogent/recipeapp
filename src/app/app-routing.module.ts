import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  { path: 'recipe/list', component: RecipeListComponent },
  { path: 'recipe/add', component: AddRecipeComponent },
  { path: 'recipe/detail/:id', component: RecipeDetailComponent },
  { path: '', redirectTo: 'recipe/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
