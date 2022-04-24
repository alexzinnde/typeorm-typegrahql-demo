import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Recipe {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;

  @Field()
  @Column("varchar", { length: 100 })
  title: string;

  @Field({ nullable: true })
  @Column("text")
  description?: string;

  @Field()
  @Column("date", { default: new Date().toISOString() })
  creationDate: Date;

  @Field((type) => [String])
  @Column("simple-array", { nullable: true })
  ingredients: string[];
}
