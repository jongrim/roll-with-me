import { v4 as uuidv4 } from 'uuid';

context('room not found', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body?.query?.includes('RoomByName')) {
        req.alias = 'gqlRoomByName';
      }
      if (req.body?.query?.includes('CreateSafetyModule')) {
        req.reply({
          data: {
            createSafetyModule: {
              id: uuidv4(),
              linesAndVeils: [],
              xCardActive: false,
            },
          },
        });
      }
      if (req.body?.query?.includes('CreateTextRoom')) {
        req.alias = 'gqlCreateTextRoom';
        req.reply({});
      }
      if (req.body?.query?.includes('CreateInteractiveRoom')) {
        req.alias = 'gqlCreateInteractiveRoom';
        req.reply({});
      }
      if (req.body?.query?.includes('CreateTrophyDarkRoom')) {
        req.alias = 'gqlCreateTrophyDarkRoom';
        req.reply({});
      }
    });
    cy.intercept('/random-room-name').as('roomNames');
  });

  it('redirects to the new room page for visual', () => {
    const randomRoomName = uuidv4();
    cy.visit(`http://localhost:3000/i/${randomRoomName}`);
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', randomRoomName);
    cy.findByText(/Visual/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateInteractiveRoom');
  });

  it('redirects to the new room page for text', () => {
    const randomRoomName = uuidv4();
    cy.visit(`http://localhost:3000/r/${randomRoomName}`);
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', randomRoomName);
    cy.findByText(/Text/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateTextRoom');
  });

  it('redirects to the new room page for trophy-dark', () => {
    const randomRoomName = uuidv4();
    cy.visit(`http://localhost:3000/trophy-dark/${randomRoomName}`);
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', randomRoomName);
    cy.findByText(/Trophy Dark/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateTrophyDarkRoom');
  });
});
