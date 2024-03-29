context("guest user", () => {
  beforeEach(() => {
    window.localStorage.setItem("desktop-notifications-declined", "true");
  });

  it("can create a new text roller", () => {
    cy.intercept("*/random-room-name?*").as("newRoom");
    cy.visit("http://localhost:3000");
    cy.wait("@newRoom", { timeout: 7000 });
    cy.findByText("Go").click();
    cy.url().should("contain", "/r/");
  });

  it("is prompted for a username", () => {
    cy.visit("http://localhost:3000/r/cypress-testing-room");
    cy.findByTestId("username-modal").within(() => {
      cy.findByText("Set your name");
      cy.findByText("Choose a username for your rolls");
      cy.findByText("Close").click();
    });
    cy.findByTestId("username-modal").within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type("cypress");
      cy.findByText("Close").click();
    });
  });

  it("can roll using the dice icons", () => {
    cy.findByLabelText(/d4/i).click();
    cy.findByText(/4 sided/i);
    cy.findByLabelText(/d6/i).click();
    cy.findByText(/6 sided/i);
    cy.findByLabelText(/d8/i).click();
    cy.findByText(/8 sided/i);
    cy.findByLabelText(/d10/i).click();
    cy.findByText(/10 sided/i);
    cy.findByLabelText(/d12/i).click();
    cy.findByText(/12 sided/i);
    cy.findByLabelText(/d20/i).click();
    cy.findByText(/20 sided/i);
    cy.findByLabelText(/Modifier/i).type("2");
    cy.findByTestId(/roll-final-info/i).within(() => {
      cy.findByLabelText(/Name/i).type("every die");
      cy.findByText(/Roll/).click();
    });
    cy.findByTestId(/last-roll-results/).within(() => {
      const numbers = ["4", "6", "8", "10", "20"];
      numbers.forEach((n) => cy.findByText(`D${n}`));
    });
  });

  it("can quick roll", () => {
    cy.intercept("POST", "/graphql").as("roll");
    cy.findByPlaceholderText("Quick roll (ex. 2d6+1 as Resist)").type(
      "2d6 1d20 + 2 as cypress whammie{enter}"
    );
    cy.wait("@roll");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);
  });

  it("has info about the last roll", () => {
    cy.findByText("Last Roll");
    cy.findByText("by cypress");
    cy.findByTestId("die-0").within(() => {
      cy.findByText(/D6/i);
      cy.findByText(/total/i);
      cy.findByText(/Die 1/i);
      cy.findByText(/Die 2/i);
    });
    cy.findByTestId("die-1").within(() => {
      cy.findByText(/D20/i);
      cy.findByText(/total/i);
      cy.findByText(/Die 1/i);
    });
  });

  it("can roll with the quick buttons", () => {
    cy.intercept("POST", "/graphql").as("roll");
    const buttons = ["2d6", "1d20", "2d20", "1d100"];
    buttons.forEach((button) => {
      cy.findByText(button).click();
      cy.findByTestId("last-roll-results").within(() => {
        cy.findByText(button);
      });
    });
  });
});
