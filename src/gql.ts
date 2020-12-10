import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api'

/**
 * This function only works for the stock, out of the box create read update stuff.
 * It does not work for generated queries that use key indexes.
 */
async function gql<T extends object>(
  query: string,
  variables?: object,
  additionalHeaders?: {
    [key: string]: string;
  }
): Promise<GraphQLResult<T>> {
  const q = (await API.graphql(
    {
      query,
      variables: variables && { input: variables },
    },
    additionalHeaders
  )) as Promise<GraphQLResult<T>>;
  return q;
}

export default gql
