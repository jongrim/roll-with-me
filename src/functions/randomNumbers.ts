import { API } from 'aws-amplify';

export async function getRandomNumbers(count: number) {
  try {
    const { result } = await API.get('randomNumbersAPI', '/random-numbers', {
      queryStringParameters: { count },
    });
    return result.data;
  } catch (e) {
    console.warn(e);
  }
}
