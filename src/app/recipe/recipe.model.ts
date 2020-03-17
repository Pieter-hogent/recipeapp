import { Ingredient, IngredientJson } from './ingredient.model';

interface RecipeJson {
  id: number;
  name: string;
  ingredients: IngredientJson[];
  created: string;
  chef: string;
}
export class Recipe {
  private _id: number;
  constructor(
    private _name: string,
    private _ingredients = new Array<Ingredient>(),
    private _dateAdded = new Date(),
    private _chef = ''
  ) {}

  static fromJSON(json: RecipeJson): Recipe {
    const rec = new Recipe(
      json.name,
      json.ingredients.map(Ingredient.fromJSON),
      new Date(json.created),
      json.chef
    );
    rec._id = json.id;
    return rec;
  }

  toJSON(): RecipeJson {
    return <RecipeJson>{
      name: this.name,
      ingredients: this.ingredients.map(ing => ing.toJSON()),
      created: this.dateAdded.toString(),
      chef: this.chef
    };
  }
  get id(): number {
    return this._id;
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

  get chef(): string {
    return this._chef;
  }

  addIngredient(name: string, amount?: number, unit?: string) {
    this._ingredients.push(new Ingredient(name, amount, unit));
  }
}
