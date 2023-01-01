import { GraphQLPostType } from './post.typedef';
import { GraphQLUserType } from './user.typedef';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const GraphQLCommentType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
      id: { type: GraphQLID },
      comment: { type: GraphQLString },
      userId: { type: GraphQLInt },
      postId: { type: GraphQLInt },
      createdAt: { type: GraphQLString },
      user: { type: GraphQLUserType },
      post: { type: GraphQLPostType },
    }),
  });
