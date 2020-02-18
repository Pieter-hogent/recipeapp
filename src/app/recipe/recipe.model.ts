import { Ingredient, IngredientJson } from './ingredient.model';

interface RecipeJson {
  name: string;
  ingredients: IngredientJson[];
  created: string;
}
export class Recipe {
  constructor(
    private _name: string,
    private _ingredients = new Array<Ingredient>(),
    private _dateAdded = new Date()
  ) {}

  static fromJSON(json: RecipeJson): Recipe {
    const rec = new Recipe(
      json.name,
      json.ingredients.map(Ingredient.fromJSON),
      new Date(json.created)
    );
    return rec;
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  get dateAdded(): Date {
    return this._dateAdded;
  }

  get name(): string {
    return this._name;
  }

  addIngredient(name: string, amount?: number, unit?: string) {
    this._ingredients.push(new Ingredient(name, amount, unit));
  }
}
