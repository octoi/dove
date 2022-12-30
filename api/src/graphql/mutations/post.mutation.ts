import { createPostController } from '@/controllers/post.controller';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLPostType } from '../typedefs/post.typedef';
import { validateCreatePostArgs } from '../validators/post.validator';

export const CreatePostMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLPostType,
  args: {
    ngoId: { type: GraphQLString },
    text: { type: GraphQLString },
    media: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const args = validateCreatePostArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return createPostController(user?.id, args);
  },
};
