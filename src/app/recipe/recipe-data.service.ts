import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  constructor(private http: HttpClient) {}

  get recipes$(): Observable<Recipe[]> {
    return this.http
      .get(`${environment.apiUrl}/recipes/`)
      .pipe(map((list: any[]): Recipe[] => list.map(Recipe.fromJSON)));
  }
  addNewRecipe(recipe: Recipe) {
    throw 'not implemented yet';
  }
}
