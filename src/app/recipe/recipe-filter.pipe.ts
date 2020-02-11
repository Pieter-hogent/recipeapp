import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe.model';

@Pipe({
  name: 'recipeFilter'
})
export class RecipeFilterPipe implements PipeTransform {
  transform(recipes: Recipe[], name: string): Recipe[] {
    if (!name || name.length === 0) {
      return recipes;
    }
    return recipes.filter(rec =>
      rec.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }
}
