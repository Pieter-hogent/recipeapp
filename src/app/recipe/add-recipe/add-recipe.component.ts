import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  public readonly unitTypes = ['Liter', 'Gram', 'Tbsp', 'Pcs'];
  public recipe: FormGroup;
  @Output() public newRecipe = new EventEmitter<Recipe>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.recipe = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      ingredients: this.fb.array([this.createIngredients()])
    });
  }

  createIngredients(): FormGroup {
    return this.fb.group({
      amount: [''],
      unit: [''],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  onSubmit() {
    let ingredients = this.recipe.value.ingredients.map(Ingredient.fromJSON);
    ingredients = ingredients.filter(ing => ing.name.length > 2);
    this.newRecipe.emit(new Recipe(this.recipe.value.name, ingredients));
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} 
        characters (got ${errors.minlength.actualLength})`;
    }
  }
}
