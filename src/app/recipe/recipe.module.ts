import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [RecipeComponent, IngredientComponent],
	imports: [CommonModule],
	exports: [RecipeComponent]
})
export class RecipeModule {}
