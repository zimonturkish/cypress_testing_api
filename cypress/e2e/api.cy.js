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

  // how to validate headers
  it('API Test - Validate Headers', () => {
        cy.request('/users/2').as('user')
        // the response has stored as @user
        cy.get('@user')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

        cy.get('@user')
        .its('headers')
        .its('connection')
        .should('include', 'keep-alive')
      })
})