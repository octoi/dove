import { Paths } from './paths';

export const GRAPHQL_ENDPOINT = 'http://localhost:5000/graphql';
export const FILE_API_ENDPOINT = 'http://localhost:5000/file';

// getServerSideProps redirect to 404 data
export const GSSPRedirectData = {
  redirect: {
    destination: Paths.notFound,
    permanent: false,
  },
  props: {},
};
