import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

async function setXCard({ value, id }: { value: boolean; id: string }) {
  try {
    await API.graphql({
      query: mutations.updateSafetyModule,
      variables: {
        input: {
          id,
          xCardActive: value,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
  return;
}

export default setXCard;
