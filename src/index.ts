import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";

import { RecipeResolver } from "./recipe/gql.resolver";
import { buildSchema } from "type-graphql";
import { sampleRecipes } from "./recipe/db.sample";

// put sample recipes in container
Container.set({ id: "SAMPLE_RECIPES", factory: () => sampleRecipes.slice() });

async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    // register 3rd party IOC container
    container: Container,
  });

  // Create GraphQL server
  const server = new ApolloServer({ schema });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();