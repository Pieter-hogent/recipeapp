import { MaterialModule } from './../material/material.module';
import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [RecipeComponent, IngredientComponent, RecipeListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [RecipeListComponent]
})
export class RecipeModule {}
