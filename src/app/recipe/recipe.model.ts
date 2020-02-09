interface RecipeJson {
  name: string;
  ingredients: string[];
  dateAdded: string;
}
export class Recipe {
  constructor(
    private _name: string,
    private _ingredients = new Array<string>(),
    private _dateAdded = new Date()
  ) {}

  static fromJSON(json: RecipeJson): Recipe {
    const rec = new Recipe(
      json.name,
      json.ingredients,
      new Date(json.dateAdded)
    );
    return rec;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  get dateAdded(): Date {
    return this._dateAdded;
  }

  get name(): string {
    return this._name;
  }

  addIngredient(name: string, amount?: number, unit?: string) {
    this._ingredients.push(`${amount || 1} ${unit || ''} ${name}`);
  }
}
