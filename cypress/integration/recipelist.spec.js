describe('Recipe List tests', function () {
  beforeEach(function () {
    cy.login();
  });

  it('delayed response brings state out of sync', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/recipes',
      status: 200,
      response: 'fixture:recipes.json',
    });
    cy.route({
      delay: 2000,
      method: 'GET',
      url: '/api/recipes/?name=sp',
      status: 200,
      response: 'fixture:spaghetti.json',
    }).as('getSPrecipes');
    cy.route({
      method: 'GET',
      url: '/api/recipes/?name=la',
      status: 200,
      response: 'fixture:lasagna.json',
    }).as('getLArecipes');

    cy.visit('/');
    cy.get('[data-cy=filterInput]').type('sp');
    cy.wait(300);
    cy.get('[data-cy=filterInput]').type('{backspace}{backspace}la');
    cy.wait(['@getSPrecipes', '@getLArecipes']);
    cy.get('[data-cy=recipeCard]').should('have.length', 1);
    cy.get('[data-cy=recipe-title]').should('contain', 'Lasagna');
  });
});
