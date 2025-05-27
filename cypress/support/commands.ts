// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */

        // Teste_1
        clearCheckboxes(value: string): Chainable<Element>;

        // Teste_2
        // GetValidation(value: string): Chainable<Element>;
        // CreateValidation(value: string): Chainable<Element>;
        // UpdateValidation(value: string): Chainable<Element>;
        // DeleteValidation(value: string): Chainable<Element>;
    }
}
//#region Teste 01
Cypress.Commands.add('clearCheckboxes', (checkboxName, ...args) => {
    cy.get(`input[name="${checkboxName}"]`)
        .should('have.length.greaterThan', 0)
        .its('length')
        .then((n) => {
            for (let i = 0; i < n; i++) {
                cy.get(`input[name="${checkboxName}"]`).uncheck();
            }
        });
});
//#endregion Teste 01

//#region Teste 02
// Acelera a criação do teste - Quality of Life

// Cypress.Commands.add('GetValidation', (validateFocus, refObject, xpectedStatus, ...args) => {
//
// });

// Cypress.Commands.add('CreateValidation', (validateFocus, refObject, xpectedStatus, ...args) => {
//
// });

// Cypress.Commands.add('UpdateValidation', (validateFocus, refObject, xpectedStatus, ...args) => {
//
// });

// Cypress.Commands.add('DeleteValidation', (validateFocus, refObject, xpectedStatus, ...args) => {
//
// });
//#endregion
