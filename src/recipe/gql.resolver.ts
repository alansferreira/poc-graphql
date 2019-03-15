
import { RecipeGql } from "./gql.model";
import { RecipeService } from "./db.service";
import { RecipeInput } from "./input";
import { Query, Arg, Mutation, FieldResolver, Root, Resolver } from "type-graphql";
import { IRecipe } from "./interface";
import { RecipeOrm } from "./db.model";

@Resolver(RecipeGql)
export class RecipeResolver {
  constructor(
    // constructor injection of service
    private readonly recipeService: RecipeService,
  ) {}

  @Query(returns => RecipeGql, { nullable: true })
  async recipe(@Arg("recipeId") recipeId: string) {
    return this.recipeService.getOne(recipeId);
  }

  @Query(returns => [RecipeGql])
  async recipes(): Promise<RecipeGql[]> {
    const rest = await this.recipeService.getAll();
    
    return rest.map(this.orm2Qgl);

  }

  @Mutation(returns => RecipeGql)
  async addRecipe(@Arg("recipe") recipe: RecipeInput): Promise<RecipeGql> {
    return this.orm2Qgl(await this.recipeService.add(recipe));
  }

  @FieldResolver()
  async numberInCollection(@Root() recipe: RecipeGql): Promise<number> {
    const index = await this.recipeService.findIndex(this.gql2Orm(recipe));
    return index + 1;
  }


  orm2Qgl(orm: RecipeOrm): RecipeGql{
    return <RecipeGql>{
      ...orm, 
      ingredients: JSON.parse(orm.ingredients)
    }
  }

  gql2Orm(gql: RecipeGql): RecipeOrm{
    return <RecipeOrm>{
      ...gql, 
      ingredients: JSON.stringify(gql.ingredients)
    }
  }

}