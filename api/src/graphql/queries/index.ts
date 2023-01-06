import { GraphQLObjectType } from 'graphql';
import { GetPostCommentsQuery } from './comment.query';
import { GetNgoDetailsQuery } from './ngo.query';
import { GetPostQuery, LoadNgoPostsQuery } from './post.query';
import { GetUserQuery } from './user.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    // user query
    getUser: GetUserQuery,
    // ngo query
    getNgoDetails: GetNgoDetailsQuery,
    // post query
    getPost: GetPostQuery,
    loadNgoPosts: LoadNgoPostsQuery,
    // comment query
    getPostComments: GetPostCommentsQuery,
  }),
});
