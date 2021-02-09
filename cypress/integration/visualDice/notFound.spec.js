context('room not found', () => {
  it('redirects to the new room page', () => {
    cy.intercept('POST', '/graphql').as('roomLoading');
    cy.intercept('/random-room-name').as('roomNames');
    cy.visit('http://localhost:3000/i/cypress-rolls-best');
    cy.wait('@roomLoading', { timeout: 7000 });
    cy.findByText(/That room doesn't exist/i, { timeout: 7000 });
    cy.findByTestId('room-name').should('have.value', 'cypress-rolls-best');
    cy.findByText(/Visual/i).should('have.attr', 'data-checked');
    cy.wait('@roomNames', { timeout: 7000 });
  });
});
