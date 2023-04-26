import React from 'react'
import HorsepowerCard from './HorsepowerCard'

describe('<HorsepowerCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HorsepowerCard path={''} />)
    cy.get('p').contains('Horsepower Predictor')
  })
})