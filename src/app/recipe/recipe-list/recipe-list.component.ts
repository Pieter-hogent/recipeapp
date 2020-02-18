import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDataService } from '../recipe-data.service';
import { Subject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  public filterRecipeName: string;
  public filterRecipe$ = new Subject<string>();
  private _fetchRecipes$: Observable<Recipe[]> = this._recipeDataService
    .recipes$;

  constructor(private _recipeDataService: RecipeDataService) {
    this.filterRecipe$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterRecipeName = val));
  }

  applyFilter(filter: string) {
    this.filterRecipeName = filter;
  }

  get recipes$(): Observable<Recipe[]> {
    return this._fetchRecipes$;
  }

  addNewRecipe(recipe) {
    this._recipeDataService.addNewRecipe(recipe);
  }
}
