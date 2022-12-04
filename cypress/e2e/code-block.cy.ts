describe('Code block flow', () => {
  it('creates new code block', () => {
    cy.visit('localhost:3000');
    cy.contains('New Code Block').click();
    cy.get('.editor-wrapper').should('be.visible');
  });

  it('runs correct code', () => {
    cy.visit('localhost:3000');
    cy.contains('New Code Block').click();
    const testString = 'Some completely random test string';

    const code = `
      import React from 'react';
      import ReactDOM from 'react-dom';

      const App = () =>
         <div>${testString}</div>

      ReactDOM.render(<App/>, document.querySelector('#root'));
    `;

    cy.get('.view-lines')
      .click()
      // change subject to currently focused element
      .focused()
      .type(code, { delay: 1 });

    cy.wait(4000);

    cy.get('iframe[data-cy="preview"]')
      .iframe()
      .contains(testString)
      .should('exist');
  });
});
