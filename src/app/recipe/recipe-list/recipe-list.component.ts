import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDataService } from '../recipe-data.service';
import { Subject, Observable, of, EMPTY, merge } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter,
  catchError,
  scan,
  tap,
  switchMap,
} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  public filterRecipeName: string = '';
  public filterRecipe$ = new Subject<string>();
  private _fetchRecipes$: Observable<Recipe[]>;

  public errorMessage: string = '';

  constructor(
    private _recipeDataService: RecipeDataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.filterRecipe$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val) => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/recipe/list'], params);
      });

    this._fetchRecipes$ = this._route.queryParams
      .pipe(
        switchMap((newParams) => {
          // set the value of the input field with the url parameter as well
          if (newParams['filter']) {
            this.filterRecipeName = newParams['filter'];
          }
          // when the queryparameter changes, take the filter parameter and use it to ask
          // the service for all recipes with this filter in their name
          // this._recipeDataService.getRecipes$(params['filter']).subscribe(
          return this._recipeDataService.getRecipes$(newParams['filter']);
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }

  ngOnInit(): void {}

  applyFilter(filter: string) {
    this.filterRecipeName = filter;
  }

  get recipes$(): Observable<Recipe[]> {
    return this._fetchRecipes$;
  }
}
