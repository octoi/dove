import { GraphQLLikeType } from './like.typedef';
import { GraphQLNgoType } from './ngo.typedef';
import { GraphQLCommentType } from './comment.typedef';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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
      Like: { type: new GraphQLList(GraphQLLikeType) },
      Comment: { type: new GraphQLList(GraphQLCommentType) },
      _count: {
        type: new GraphQLObjectType({
          name: 'Count',
          fields: () => ({
            Like: { type: GraphQLInt },
            Comment: { type: GraphQLInt },
          }),
        }),
      },
    }),
  });
