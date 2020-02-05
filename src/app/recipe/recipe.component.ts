import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
	name: string;
	ingredients: string[];

	constructor() {
		this.name = 'spaghetti';
		this.ingredients = ['tomato', 'onion', 'celery', 'carrot', 'minced meat'];
	}

	ngOnInit() {}
}
