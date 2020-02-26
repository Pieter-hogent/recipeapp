import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private _reloadRecipes$ = new BehaviorSubject<boolean>(true);
  private _allRecipes$ = this._reloadRecipes$.pipe(
    switchMap(() => this.recipes$)
  );

  constructor(private http: HttpClient) {}

  get allRecipes$(): Observable<Recipe[]> {
    return this._allRecipes$;
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
      .subscribe((rec: Recipe) => {
        this._reloadRecipes$.next(true);
      });
  }

  deleteRecipe(recipe: Recipe) {
    return this.http
      .delete(`${environment.apiUrl}/recipes/${recipe.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => this._reloadRecipes$.next(true));
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
