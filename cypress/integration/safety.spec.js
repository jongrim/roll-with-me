import { v4 as uuidv4 } from 'uuid';

let note = uuidv4();

context('signed in', () => {
  before(() => {
    cy.login();
  });

  it('can add safety items to a room', () => {
    cy.visit('http://localhost:3000/r/cypress-testing-room');
    cy.findByText('Safety').click();
    cy.findByTestId('new-item-form').within(() => {
      cy.findByLabelText(/Item/i).type('spiders');
      cy.findByLabelText(/Rating/i).select('Line');
      cy.findByLabelText(/Note/i).type(note);
      cy.findByText('Add Item').click();
    });
    cy.findByText(note)
      .parents('[data-testid=safety-item]')
      .within(() => {
        cy.findByText('spiders');
        cy.findByText('Line');
      });
  });

  it('can update a safety item', () => {
    cy.findByText(note)
      .parents('[data-testid=safety-item]')
      .within(() => {
        cy.findByLabelText(/edit note/i).click();
        cy.findByLabelText(/cancel/i);
        cy.findByTestId('note-input').type('abc');
        note = note + 'abc';
        cy.findByLabelText(/save note/i).click();
      });
    cy.findByText(note);
  });

  it('can delete a safety item', () => {
    cy.findByText(note)
      .parents('[data-testid=safety-item]')
      .within(() => {
        cy.findByLabelText(/delete item/i).click();
      });
    cy.findByText(note).should('not.exist');
  });
});
