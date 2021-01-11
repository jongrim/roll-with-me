export const getInteractiveRoom = /* GraphQL */ `
  query GetInteractiveRoom($id: ID!) {
    getInteractiveRoom(id: $id) {
      id
      name
      safetyModule {
        id
        xCardActive
        linesAndVeils
        createdAt
        updatedAt
      }
      dice {
        items {
          id
          x
          y
          result
          sides
          createdBy
          color
        }
        nextToken
      }
      counters {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
