import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeDataService {
  private _reloadRecipes$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  get recipes$(): Observable<Recipe[]> {
    return this.http.get(`${environment.apiUrl}/recipes/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Recipe[] => list.map(Recipe.fromJSON))
    );
  }

  getRecipe$(id: string): Observable<Recipe> {
    return this.http
      .get(`${environment.apiUrl}/recipes/${id}`)
      .pipe(catchError(this.handleError), map(Recipe.fromJSON)); // returns just one recipe, as json
  }

  getRecipes$(name?: string, chef?: string, ingredient?: string) {
    return this._reloadRecipes$.pipe(
      switchMap(() => this.fetchRecipes$(name, chef, ingredient))
    );
  }

  fetchRecipes$(name?: string, chef?: string, ingredient?: string) {
    let params = new HttpParams();
    params = name ? params.append('name', name) : params;
    params = chef ? params.append('chef', chef) : params;
    params = ingredient ? params.append('ingredientName', ingredient) : params;
    return this.http.get(`${environment.apiUrl}/recipes/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Recipe[] => list.map(Recipe.fromJSON))
    );
  }

  addNewRecipe(recipe: Recipe) {
    return this.http
      .post(`${environment.apiUrl}/recipes/`, recipe.toJSON())
      .pipe(catchError(this.handleError), map(Recipe.fromJSON))
      .pipe(
        // temporary fix, while we use the behaviorsubject as a cache stream
        catchError((err) => {
          return throwError(err);
        }),
        tap((rec: Recipe) => {
          this._reloadRecipes$.next(true);
        })
      );
  }

  deleteRecipe(recipe: Recipe) {
    return this.http
      .delete(`${environment.apiUrl}/recipes/${recipe.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._reloadRecipes$.next(true);
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
