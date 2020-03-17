import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { RecipeDataService } from './recipe-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> {
    return this.recipeService.getRecipe$(route.params['id']);
  }
}
