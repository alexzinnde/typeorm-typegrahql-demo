import { ArrayMaxSize, Length, Max, MaxLength, Min } from "class-validator";
import {
  Arg,
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Recipe from "../../entity/Recipe";

@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field((type) => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}

@ArgsType()
class RecipesArgs {
  @Field((type) => Int)
  @Min(0)
  skip: number = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}

@Resolver(Recipe)
class RecipeResolver {
  private recipeRepository: Repository<Recipe>;
  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
  }
  @Query((returns) => Recipe)
  async recipe(@Arg("id") id: string) {
    const recipe = await this.recipeRepository.findBy({ id });
    return recipe;
  }

  @Query((returns) => [Recipe])
  recipes(@Args() { skip, take }: RecipesArgs) {
    return this.recipeRepository.find({ skip, take });
  }

  @Mutation((returns) => Recipe)
  async addRecipe(
    @Arg("newRecipeData") newRecipeData: NewRecipeInput
  ): Promise<Recipe> {
    return await this.recipeRepository.save(newRecipeData);
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Arg("id") id: string) {
    try {
      this.recipeRepository.delete({ id });
      return true;
    } catch {
      return false;
    }
  }
}

export { NewRecipeInput, RecipesArgs, RecipeResolver };
