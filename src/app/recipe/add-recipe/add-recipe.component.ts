import { RecipeDataService } from './../recipe-data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Ingredient } from '../ingredient.model';
import { debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

function validateIngredientName(control: FormGroup): { [key: string]: any } {
  if (
    control.get('amount').value.length >= 1 &&
    control.get('name').value.length < 2
  ) {
    return { amountNoName: true };
  }
  return null;
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  public readonly unitTypes = ['Liter', 'Gram', 'Tbsp', 'Pcs'];
  public recipe: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private _recipeDataService: RecipeDataService
  ) {}

  get ingredients(): FormArray {
    return <FormArray>this.recipe.get('ingredients');
  }
  ngOnInit() {
    this.recipe = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      ingredients: this.fb.array([this.createIngredients()]),
    });

    this.ingredients.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((ingList) => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = ingList[ingList.length - 1];

        if (lastElement.name && lastElement.name.length > 2) {
          this.ingredients.push(this.createIngredients());
        } else if (ingList.length >= 2) {
          const secondToLast = ingList[ingList.length - 2];
          if (
            !lastElement.name &&
            !lastElement.amount &&
            !lastElement.unit &&
            (!secondToLast.name || secondToLast.name.length < 2)
          ) {
            this.ingredients.removeAt(this.ingredients.length - 1);
          }
        }
      });
  }

  createIngredients(): FormGroup {
    return this.fb.group(
      {
        amount: [''],
        unit: [''],
        name: [''],
      },
      { validator: validateIngredientName }
    );
  }
  onSubmit() {
    let ingredients = this.recipe.value.ingredients.map(Ingredient.fromJSON);
    ingredients = ingredients.filter((ing) => ing.name.length > 2);
    this._recipeDataService
      .addNewRecipe(new Recipe(this.recipe.value.name, ingredients))
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe((rec: Recipe) => {
        this.confirmationMessage = `a recipe for ${rec.name} was successfully added`;
      });

    this.recipe = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      ingredients: this.fb.array([this.createIngredients()]),
    });
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} characters (got ${errors.minlength.actualLength})`;
    } else if (errors.amountNoName) {
      return `if amount is set you must set a name`;
    }
  }
}
