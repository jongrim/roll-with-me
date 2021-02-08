// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/').as(
    'signIn'
  );
  cy.visit('http://localhost:3000');
  cy.findByText('Sign up or sign in');
  cy.visit('http://localhost:3000/sign-in');
  cy.findByLabelText(/Username/i).type('cypress');
  cy.findByLabelText(/Password/i).type('Cypress@rwm');
  cy.findByText('Submit').click();
  cy.wait('@signIn');
  cy.wait('@signIn');
});
