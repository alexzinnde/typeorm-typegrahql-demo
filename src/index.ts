import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { RecipeResolver } from "./graphql/resolvers/RecipeResolver";

AppDataSource.initialize()
  .then(async () => {
    const server = new ApolloServer({
      schema: await buildSchema({ resolvers: [RecipeResolver] }),
    });

    server
      .listen(3500)
      .then(() => console.log("Apollo Server running on port 3500"));
  })
  .catch((error) => console.log(error));
