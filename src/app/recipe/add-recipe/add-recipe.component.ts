import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  @Output() public newRecipe = new EventEmitter<Recipe>();
  constructor() {}

  ngOnInit() {}

  addRecipe(recipeName: HTMLInputElement): boolean {
    const recipe = new Recipe(recipeName.value, []);
    this.newRecipe.emit(recipe);
    return false;
  }
}
