import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQLUserType } from './user.typedef';

export const GraphQLNgoType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'NGO',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      profile: { type: GraphQLString },
      banner: { type: GraphQLString },
      creatorId: { type: GraphQLID },
      creator: { type: GraphQLUserType },
      members: { type: new GraphQLList(GraphQLUserType) },
      admins: { type: new GraphQLList(GraphQLUserType) },
    }),
  });
