import { MaterialModule } from './../material/material.module';
import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [RecipeComponent, IngredientComponent],
	imports: [CommonModule, MaterialModule],
	exports: [RecipeComponent]
})
export class RecipeModule {}
