describe('My First Test', function() {
  it('our app runs', function() {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy=filterInput]').type('sp');
    cy.get('[data-cy=recipeCard]').should('have.length', 1);
  });
});
