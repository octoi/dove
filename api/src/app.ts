import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './graphql';

const server = new ApolloServer({ schema });

const PORT: number = Number(process.env.PORT) || 5000;

startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: { port: PORT },
})
  .then(({ url }) => {
    console.log(`[🚀] GRAPHQL SERVER AT ${url}`);
  })
  .catch((err) => {
    console.log(`[🛑] FAILED TO START GRAPHQL SERVER`);
    console.log(err);
  });
