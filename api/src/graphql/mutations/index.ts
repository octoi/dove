import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    logHello: {
      type: GraphQLString,
      args: {
        val: { type: GraphQLString },
      },
      resolve(_, args) {
        console.log(args);
        return 'hello';
      },
    },
  }),
});
