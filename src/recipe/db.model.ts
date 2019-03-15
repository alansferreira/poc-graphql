import { IRecipe } from "./interface";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class RecipeOrm extends BaseEntity implements IRecipe {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  creationDate: Date;

  @Column()
  ingredients: string;
}


