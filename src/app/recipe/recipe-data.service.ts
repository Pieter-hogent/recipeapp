import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private _recipes$ = new BehaviorSubject<Recipe[]>([]);
  private _recipes: Recipe[];

  constructor(private http: HttpClient) {
    this.recipes$
      .pipe(
        catchError(err => {
          // temporary fix, while we use the behaviorsubject as a cache stream
          this._recipes$.error(err);
          return throwError(err);
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this._recipes = recipes;
        this._recipes$.next(this._recipes);
      });
  }

  get allRecipes$(): Observable<Recipe[]> {
    return this._recipes$;
  }

  get recipes$(): Observable<Recipe[]> {
    return this.http.get(`${environment.apiUrl}/recipes/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Recipe[] => list.map(Recipe.fromJSON))
    );
  }

  addNewRecipe(recipe: Recipe) {
    return this.http
      .post(`${environment.apiUrl}/recipes/`, recipe.toJSON())
      .pipe(
        tap(console.log),
        catchError(this.handleError),
        map(Recipe.fromJSON)
      )
      .pipe(
        // temporary fix, while we use the behaviorsubject as a cache stream
        catchError(err => {
          this._recipes$.error(err);
          return throwError(err);
        })
      )
      .subscribe((rec: Recipe) => {
        this._recipes = [...this._recipes, rec];
        this._recipes$.next(this._recipes);
      });
  }

  deleteRecipe(recipe: Recipe) {
    return this.http
      .delete(`${environment.apiUrl}/recipes/${recipe.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._recipes = this._recipes.filter(rec => rec.id != recipe.id);
        this._recipes$.next(this._recipes);
      });
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }
}
