import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeDataService: RecipeDataService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(item => (this.recipe = item['recipe']));
  }
}
