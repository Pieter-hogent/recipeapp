export interface IngredientJson {
  name: string;
  amount: number;
  unit: string;
}
export class Ingredient {
  constructor(
    private _name: string,
    private _amount: number,
    private _unit: string
  ) {}

  static fromJSON(json: IngredientJson): Ingredient {
    const amount =
      typeof json.amount === 'string' ? parseInt(json.amount) : json.amount;
    const ing = new Ingredient(json.name, amount, json.unit);
    return ing;
  }

  toJSON(): IngredientJson {
    return { name: this.name, amount: this.amount, unit: this.unit };
  }

  get name() {
    return this._name;
  }
  get amount() {
    return this._amount;
  }
  get unit() {
    return this._unit;
  }
}
