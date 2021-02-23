import { v4 as uuidv4 } from 'uuid';

let roomName = uuidv4();

context('guest user', () => {
  it('can create a new visual room', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body?.query?.includes('CreateInteractiveRoom')) {
        req.alias = 'gqlCreateInteractiveRoom';
      }
    });
    cy.intercept('/random-room-name').as('newRoom');
    cy.visit('http://localhost:3000');
    cy.wait('@newRoom', { timeout: 7000 });
    cy.findByText(/Visual Dice Table/i).click();
    cy.wait('@newRoom', { timeout: 7000 });
    cy.findByTestId('room-name').clear().type(roomName);
    cy.findByTestId('go-to-new-room').click();
    cy.wait('@gqlCreateInteractiveRoom');
  });

  it('is prompted for a username', () => {
    cy.visit(`http://localhost:3000/i/${roomName}`);
    cy.findByTestId('username-modal').within(() => {
      cy.findByText('Set your name');
      cy.findByText('Choose a username for your rolls');
      cy.findByText('Close').click();
    });
    cy.findByTestId('username-modal').within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type('cypress');
      cy.findByText('Close').click();
    });
  });

  it('can add dice using the buttons', () => {
    cy.intercept('/random-numbers').as('randomNumbers');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body?.query?.includes('CreateVisualDie')) {
        req.alias = 'gqlCreateVisualDie';
      }
      if (req.body?.query?.includes('DeleteVisualDie')) {
        req.alias = 'gqlDeleteVisualDie';
      }
    });
    [
      '4 sided',
      '6 sided',
      '8 sided',
      '10 sided',
      '12 sided',
      '20 sided',
      'fudge',
    ].forEach((label) => {
      cy.findByLabelText(`New ${label} die`).click();
      cy.wait('@randomNumbers');
      cy.wait('@gqlCreateVisualDie');
      cy.findByLabelText(`${label} die`).click({ force: true });
      cy.findByLabelText('roll die').click({ force: true });
      cy.wait('@randomNumbers');
      cy.findByLabelText(`${label} die`).click({ force: true });
      cy.findByLabelText('delete die').click({ force: true });
      cy.wait('@gqlDeleteVisualDie');
    });
  });

  // it('can quick roll', () => {
  //   cy.intercept('/random-numbers').as('randomNumbers');
  //   cy.findByPlaceholderText('Quick roll (ex. 2d6+1 as Resist)').type(
  //     '2d6 1d20 + 2 as cypress whammie{enter}'
  //   );
  //   cy.wait('@randomNumbers', { timeout: 7000 });
  //   cy.findByText('Last Roll');
  //   cy.findByText('by cypress');
  //   cy.findByTestId('die-0').within(() => {
  //     cy.findByText('D6');
  //     cy.findByText(/total/i);
  //     cy.findByText('Die 1');
  //     cy.findByText('Die 2');
  //   });
  //   cy.findByTestId('die-1').within(() => {
  //     cy.findByText('D20');
  //     cy.findByText(/total/i);
  //     cy.findByText('Die 1');
  //   });
  // });
});
