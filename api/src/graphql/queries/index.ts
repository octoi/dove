import { GraphQLObjectType } from 'graphql';
import { GetPostCommentsQuery } from './comment.query';
import { GetNgoDetailsQuery } from './ngo.query';
import { GetPostQuery, LoadNgoPostsQuery } from './post.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getNgoDetails: GetNgoDetailsQuery,
    // post query
    getPost: GetPostQuery,
    loadNgoPosts: LoadNgoPostsQuery,
    // comment query
    getPostComments: GetPostCommentsQuery,
  }),
});
