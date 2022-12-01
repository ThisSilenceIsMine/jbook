describe('Code block flow', () => {
  it('creates new code block', () => {
    cy.visit('localhost:3000');
    cy.contains('New Code Block').click();
    cy.get('.editor-wrapper').should('be.visible');
  });
});
