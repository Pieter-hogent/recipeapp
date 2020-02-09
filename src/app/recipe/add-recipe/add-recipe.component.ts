import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addRecipe(recipeName: HTMLInputElement): boolean {
    console.log(recipeName.value);
    return false;
  }
}
