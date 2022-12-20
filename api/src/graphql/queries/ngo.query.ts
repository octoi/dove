import { getNGODetails } from '@/models/ngo.model';
import { GraphQLError, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLNgoType } from '../typedefs/ngo.typedef';

export const GetNgoDetailsQuery: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
  },
  resolve(_, requestArgs) {
    if (!requestArgs?.ngoId) {
      throw new GraphQLError('Ngo ID is not provided');
    }

    return getNGODetails(requestArgs.ngoId);
  },
};
