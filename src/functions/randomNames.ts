import { API } from 'aws-amplify';

async function getNewRoomNames(count = 1): Promise<string[]> {
  const { result } = await API.get('randomNameAPI', '/random-room-name', {
    queryStringParameters: { count },
  });
  return result;
}

export default getNewRoomNames;
