context('room not found', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body?.query?.includes('RoomByName')) {
        req.alias = 'gqlRoomByName';
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
    cy.visit('http://localhost:3000/i/cypress-rolls-best');
    cy.wait('@roomNames', { timeout: 7000 });
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', 'cypress-rolls-best');
    cy.findByText(/Visual/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateInteractiveRoom');
  });

  it('redirects to the new room page for text', () => {
    cy.visit('http://localhost:3000/r/cypress-rolls-best');
    cy.wait('@roomNames', { timeout: 7000 });
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', 'cypress-rolls-best');
    cy.findByText(/Text/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateTextRoom');
  });

  it('redirects to the new room page for trophy-dark', () => {
    cy.visit('http://localhost:3000/trophy-dark/cypress-rolls-best');
    cy.wait('@roomNames', { timeout: 7000 });
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', 'cypress-rolls-best');
    cy.findByText(/Trophy Dark/i).should('have.attr', 'data-checked');
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateTrophyDarkRoom');
  });
});
