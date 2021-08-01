context("counters", () => {
  beforeEach(() => {
    window.localStorage.setItem("desktop-notifications-declined", "true");
    cy.visit("http://localhost:3000/r/cypress-testing-room");
    cy.findByTestId("username-modal").within(() => {
      cy.findByLabelText(/Choose a username for your rolls/i).type("cypress");
      cy.findByText("Close").click();
    });
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body?.query?.includes("UpdateTextRoom")) {
        req.alias = "gqlUpdateTextRoom";
      }
    });
  });

  it("can create, update, and delete a counter", () => {
    // create
    cy.findByText(/Counters/i).click();
    cy.findByLabelText(/Title/i).type("team");
    cy.findByLabelText(/Starting count/i).type("5");
    cy.findByLabelText(/Create/i).click();
    cy.wait("@gqlUpdateTextRoom");
    cy.findAllByLabelText(/team/i).first().should("have.value", 5);

    // update
    cy.findByLabelText(/increase team counter by one/i).click();
    cy.wait("@gqlUpdateTextRoom");
    cy.findAllByLabelText(/team/i).first().should("have.value", 6);

    // ensure value stays
    cy.findByText(/Build a Roll/i).click();
    cy.findByText(/Counters/i).click();
    cy.findAllByLabelText(/team/i).first().should("have.value", 6);

    //update
    cy.findByLabelText(/decrease team counter by one/i).click();
    cy.wait("@gqlUpdateTextRoom");
    cy.findAllByLabelText(/team/i).first().should("have.value", 5);

    // delete
    cy.findByLabelText(/delete the team counter/i).click();
    cy.findByText(/Delete Counter/i);
    cy.findAllByText(/delete/i)
      .last()
      .click();
    cy.wait("@gqlUpdateTextRoom");
    cy.findByText(/team/i).should("not.exist");
  });
});
