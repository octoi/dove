import { GraphQLID, GraphQLInt, GraphQLObjectType } from 'graphql';
import { GraphQLPostType } from './post.typedef';
import { GraphQLUserType } from './user.typedef';

export const GraphQLLikeType: GraphQLObjectType<any, any> =
  new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
      id: { type: GraphQLID },
      userId: { type: GraphQLInt },
      postId: { type: GraphQLInt },
      user: { type: GraphQLUserType },
      post: { type: GraphQLPostType },
    }),
  });
