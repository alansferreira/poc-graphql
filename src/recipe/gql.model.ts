import { ObjectType, Field, ID } from "type-graphql";
import { IRecipe } from "./interface";

@ObjectType()
export class RecipeGql {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}


