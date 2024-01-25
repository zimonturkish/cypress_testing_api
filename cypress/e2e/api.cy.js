/// <reference types="cypress" />

describe("Learning REST API Testing with Cypress", () => {
  it("passes", () => {
    // request to REST API asking for response
    cy.request("/users/2").then((response) => {
      // log the email of the data object
      cy.log(JSON.stringify(response.body.data.email));
      // log the complete headers of the response objcet
      cy.log(JSON.stringify(response.headers));
    });
  });

  // how to validate headers
  it("API Test - Validate Headers", () => {
    cy.request("/users/2").as("user");
    // the response has stored as @user
    cy.get("@user")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");

    cy.get("@user")
      .its("headers")
      .its("connection")
      .should("include", "keep-alive");
  });

  // Verifying the status code (200) for the response
  it("API Tests - Status Codes", () => {
    cy.request("/users/2").as("existingUser");
    // verify the successfull status code
    cy.get("@existingUser").its("status").should("equal", 200);

    cy.request({ url: "/users/non-exist", failOnStatusCode: false }).as(
      "nonExistingUser"
    );
    cy.get("@nonExistingUser").its("status").should("equal", 404);
  });

  it("API Tests - GET Request", () => {
    // Other way to write cy.request('/users/2').as('existingUser')
    cy.request({ url: "/users/2", method: "GET" }).as("user");
    cy.get("@user").then((res) => {
      // Typical way to visualize the response of the data
      cy.log(JSON.stringify(res.body));

      // Assertion: /id is equal to id in the response
      expect(res.body.data.id).equal(2);
      expect(res.body.data.email).contain("janet.weaver@reqres.in");

      // Example of negative assertion
      expect(res.body.data.last_name).not.to.contain("SomeFunnyName");

      // Using variebles to write more readable code
      const userID = res.body.data.id;
      // Verifying that the id of the endpoint is the same of the response with variable
      expect(userID).to.equal(2);
    });
  });

  // POST Request
  it.only("API Tests - POST Request", () => {
    cy.request({
      url: "/login",
      method: "POST",
      body: { email: "eve.holt@reqres.in", password: "cityslicka" },
    }).as('loginRequest');
    
    // Verifying the status code
    cy.get('@loginRequest').its('status').should('equal', 200)

    cy.get('@loginRequest').then((res) =>{
      expect(res.body.token).to.equal('QpwL5tke4Pnpja7X4')
    })
  })
})
