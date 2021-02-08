context('sign in', () => {
  it('can sign in', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('Sign up or sign in');
    cy.visit('http://localhost:3000/sign-in');
    cy.findByLabelText(/Username/i).type('cypress');
    cy.findByLabelText(/Password/i).type('Cypress@rwm');
    cy.findByText('Submit').click();
    cy.findByText('Account Settings', { timeout: 7000 });
  });
});
