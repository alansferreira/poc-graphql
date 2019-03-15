import { plainToClass } from "class-transformer";
import { Service, Inject } from "typedi";

import { RecipeOrm } from "./db.model";
import { RecipeInput } from "./input";

@Service()
export class RecipeService {
  private autoIncrementValue: number;

  constructor(@Inject("SAMPLE_RECIPES") private readonly items: RecipeOrm[]) {
    this.autoIncrementValue = this.items.length;
  }

  async getAll() {
    return this.items;
  }

  async getOne(id: string) {
    return this.items.find(it => it.id === id);
  }

  async add(data: RecipeInput): Promise<RecipeOrm> {
    const recipe = this.createRecipe(data);
    this.items.push(recipe);
    return recipe;
  }

  async findIndex(recipe: RecipeOrm) {
    return this.items.findIndex(it => it.id === recipe.id);
  }

  private createRecipe(recipeData: RecipeInput): RecipeOrm {
    const recipe = plainToClass(RecipeOrm, recipeData);
    recipe.id = this.getId();
    return recipe;
  }

  private getId(): string {
    return (++this.autoIncrementValue).toString();
  }
}