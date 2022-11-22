import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLUserType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      token: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      profile: { type: GraphQLString },
      bio: { type: GraphQLString },
    }),
  });
