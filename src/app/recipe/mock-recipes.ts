import { Recipe } from './recipe.model';

const JsonRecipes = [
  {
    name: 'spaghetti',
    ingredients: ['tomato', 'onion', 'celery', 'carrot', 'minced meat'],
    dateAdded: '2020-02-07T18:25:43.511Z'
  },
  {
    name: 'risotto',
    ingredients: ['rice', 'onion', 'parmesan', 'butter'],
    dateAdded: '2020-02-08T16:25:43.511Z'
  }
];
export const RECIPES: Recipe[] = JsonRecipes.map(Recipe.fromJSON);
