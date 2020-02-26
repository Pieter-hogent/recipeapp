import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, scan } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { Observable, pipe, EMPTY, throwError, Subject, merge } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private _addedRecipes$ = new Subject<Recipe>();
  private _allRecipes$: Observable<Recipe[]> = merge(
    this.recipes$,
    this._addedRecipes$
  ).pipe(scan((acc: Recipe[], value: Recipe) => [...acc, value]));

  constructor(private http: HttpClient) {}

  get allRecipes$(): Observable<Recipe[]> {
    return this._allRecipes$;
  }

  get recipes$(): Observable<Recipe[]> {
    return this.http.get(`${environment.apiUrl}/recipes/`).pipe(
      catchError(this.handleError),
      map((list: any[]): Recipe[] => list.map(Recipe.fromJSON))
    );
  }
  addNewRecipe(recipe: Recipe) {
    return this.http
      .post(`${environment.apiUrl}/recipes/`, recipe.toJSON())
      .pipe(catchError(this.handleError), map(Recipe.fromJSON))
      .subscribe((rec: Recipe) => this._addedRecipes$.next(rec));
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
