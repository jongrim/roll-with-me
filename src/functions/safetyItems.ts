import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { ClassifiedItem } from '../types';
import { API } from 'aws-amplify';

export async function loadSafetyItems() {
  // @ts-ignore
  const { data } = await API.graphql({
    query: queries.listSafetyItems,
    // @ts-ignore
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  });
  return data?.listSafetyItems?.items ?? [];
}

export async function createSafetyItem({
  label,
  classification,
  note,
}: {
  label: ClassifiedItem['label'];
  classification: ClassifiedItem['classification'];
  note: ClassifiedItem['note'];
}): Promise<ClassifiedItem> {
  // @ts-ignore
  const { data } = await API.graphql({
    query: mutations.createSafetyItem,
    variables: {
      input: {
        label,
        classification,
        note,
      },
    },
    // @ts-ignore
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  });
  return data?.createSafetyItem;
}
