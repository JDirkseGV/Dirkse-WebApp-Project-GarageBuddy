/// <reference types="cypress" />



describe('Testing garage-buddy app', () => {
  beforeEach(() => {
  
    cy.visit('/')
  })

  it('check main page for existing stuff', () => {
    
    cy.get('#carContent').should('have.css', 'flex')
  })

  it('can navigate to mygarage and find content', () => {

    cy.visit('/mygarage')
    cy.get('p.px-4').should('have.class', 'text-5xl')
  })
})
