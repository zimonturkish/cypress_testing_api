/// <reference types="cypress" />

describe('Learning REST API Testing with Cypress', () => {
  it('passes', () => {
    // request to REST API asking for response
    cy.request('/users/2').then((response) =>{
      // log the email of the data object
      cy.log(JSON.stringify(response.body.data.email))
      // log the complete headers of the response objcet
      cy.log(JSON.stringify(response.headers))
    })
  })
})