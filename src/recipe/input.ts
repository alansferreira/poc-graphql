import { IRecipe } from "./interface";
import { InputType, Field, ArgsType, Int } from "type-graphql";
import { MaxLength, Length, ArrayMaxSize, Min, Max } from "class-validator";
import { IPage } from "../common/interfaces";

@InputType()
export class RecipeInput implements IRecipe {
  @Field({nullable: true})
  id?: string;

  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(type => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}

@ArgsType()
export class RecipesArgs implements IPage {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
