describe('My First Test', function() {
  it('our app runs', function() {
    cy.visit('http://localhost:4200');
    cy.get('button').should('be.disabled');
  });
});
