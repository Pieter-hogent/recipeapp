describe('My First Test', function() {
  it('our app runs', function() {
    cy.visit('/');
    cy.get('[data-cy=filterInput]').type('sp');
    cy.get('[data-cy=recipeCard]').should('have.length', 1);
  });

  it('mock recipe get', function() {
    cy.server({ delay: 1000 });
    cy.route({
      method: 'GET',
      url: '/api/recipes',
      status: 200,
      response: 'fixture:recipes.json'
    });

    cy.visit('/');
    cy.get('[data-cy=recipeCard]').should('have.length', 3);
  });
  it('on error should show error message', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/recipes',
      status: 500,
      response: 'ERROR'
    });
    cy.visit('/');
    cy.get('[data-cy=appError]').should('be.visible');
  });
});
