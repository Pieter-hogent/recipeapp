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
} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  public filterRecipeName: string = '';
  public recipes: Recipe[];
  public filterRecipe$ = new Subject<string>();
  // private _fetchRecipes$: Observable<Recipe[]>;

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

    this._route.queryParams.subscribe((params) => {
      this._recipeDataService
        .getRecipes$(params['filter'])
        .pipe(
          catchError((err) => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
        .subscribe((val) => {
          this.recipes = val;
        });
      if (params['filter']) {
        this.filterRecipeName = params['filter'];
      }
    });
  }

  ngOnInit(): void {
    // this._fetchRecipes$ = this._recipeDataService.allRecipes$.pipe(
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     return EMPTY;
    //   })
    // );
  }

  applyFilter(filter: string) {
    this.filterRecipeName = filter;
  }

  // get recipes$(): Observable<Recipe[]> {
  //   return this._fetchRecipes$;
  // }
}
