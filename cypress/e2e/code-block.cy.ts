describe('Code block flow', () => {
  it('creates new code block', () => {
    cy.visit('localhost:3000');
    cy.contains('New Code Block').click();
    cy.get('.editor-wrapper').should('be.visible');
  });

  it('runs correct code', () => {
    cy.visit('localhost:3000');
    cy.contains('New Code Block').click();

    const code = `
      import React from 'react';
      import ReactDOM from 'react-dom';

      const App = () => {
        return <div>Hello, world!</div>
      }

      ReactDOM.render(document.querySelector('#root', <App/>));
    `;

    cy.get('.view-lines')
      .click()
      // change subject to currently focused element
      .focused()
      .type(code);
  });
});
