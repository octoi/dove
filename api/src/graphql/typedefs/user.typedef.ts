import { GraphQLNgoType } from './ngo.typedef';
import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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

export const GraphQLUserDataType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'UserData',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      profile: { type: GraphQLString },
      bio: { type: GraphQLString },
      joinedNGO: { type: new GraphQLList(GraphQLNgoType) },
    }),
  });
