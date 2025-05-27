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
        clearCheckboxes(value: string): Chainable<Element>;
        // getValidation(value: string): Chainable<Element>;
    }
}

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

// Cypress.Commands.add('getValidation', (validateFocus, string: typeof , ...args) => {
//     cy.get(`input[name="${validateFocus}"]`)
//         .should('have.length.greaterThan', 0)
//         .its('length')
//         .then((n) => {
//             for (let i = 0; i < n; i++) {
//                 cy.get(`input[name="${validationName}"]`).check();
//             }
//         });
// });
