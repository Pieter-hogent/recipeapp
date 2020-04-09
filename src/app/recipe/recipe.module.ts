import { MaterialModule } from './../material/material.module';
import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeFilterPipe } from './recipe-filter.pipe';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './RecipeResolver';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'list', component: RecipeListComponent },
  { path: 'add', component: AddRecipeComponent },
  {
    path: 'detail/:id',
    component: RecipeDetailComponent,
    resolve: { recipe: RecipeResolver },
  },
];
@NgModule({
  declarations: [
    RecipeComponent,
    IngredientComponent,
    RecipeListComponent,
    AddRecipeComponent,
    RecipeFilterPipe,
    RecipeDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [AddRecipeComponent, RecipeListComponent],
})
export class RecipeModule {}
