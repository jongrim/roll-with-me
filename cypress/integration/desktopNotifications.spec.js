context('Notification prompt present', () => {
  beforeEach(() => {
    window.localStorage.removeItem('desktop-notifications-declined');
    cy.intercept('POST', '/graphql', { data: {} });
  });
  it('Requests permission', () => {
    cy.visit('http://localhost:3000/r/cypress-testing-room');
    cy.findByTestId('username-modal').within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type('cypress');
      cy.findByText('Close').click();
    });
    cy.findByText(/Enable desktop notifications/i);
    cy.findByText(/Request permission/i).click();
  });

  it('can be dismissed', () => {
    cy.visit('http://localhost:3000/r/cypress-testing-room');
    cy.findByTestId('username-modal').within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type('cypress');
      cy.findByText('Close').click();
    });
    cy.findByText(/Enable desktop notifications/i);
    cy.findByText(/Dismiss/i).click();
  });
});

context('Notifications prompt dismissed', () => {
  it('stays dismissed', () => {
    cy.intercept('POST', '/graphql', { data: {} });
    window.localStorage.setItem('desktop-notifications-declined', 'true');
    cy.visit('http://localhost:3000/r/cypress-testing-room');
    cy.findByTestId('username-modal').within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type('cypress');
      cy.findByText('Close').click();
    });
    cy.findByText(/Enable desktop notifications/i).should('not.exist');
  });
});
