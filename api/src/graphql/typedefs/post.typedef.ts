import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLNgoType } from './ngo.typedef';

export const GraphQLPostType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: { type: GraphQLID },
      text: { type: GraphQLString },
      media: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      ngoId: { type: GraphQLString },
      ngo: { type: GraphQLNgoType },
      // TODO: Likes
      // TODO: Comments
    }),
  });
