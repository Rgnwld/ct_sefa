describe('Inputs', () => {
    const baseUrl = 'https://www.wcaquino.me/cypress/';
    const mainPage = baseUrl + 'componentes.html';
    beforeEach(() => {
        cy.visit(mainPage);
    });

    it('Validando campos de texto', () => {
        cy.get('#formNome').type('Cypress Teste');
        cy.get('#formNome').should('have.value', 'Cypress Teste');
        cy.get('[data-cy="dataSobrenome"]').type('Sobrenome Teste');
        cy.get('[data-cy="dataSobrenome"]').should('have.value', 'Sobrenome Teste');
        cy.get('#elementosForm\\:sugestoes').type('Sugestão Teste');
        cy.get('#elementosForm\\:sugestoes').should('have.value', 'Sugestão Teste');

        cy.get('#tabelaUsuarios > tbody > tr')
            .should('have.length.greaterThan', 0)
            .its('length')
            .then((n) => {
                for (let i = 0; i < n; i++) {
                    cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) input[type='text']`).type('Teste_' + i);
                    cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) input[type='text']`).should(
                        'have.value',
                        'Teste_' + i
                    );
                }
            });
    });

    it('Selecionando o Sexo', () => {
        cy.get('#formSexo').contains('Masculino').click();
        cy.get('#formSexo input[type="radio"][value="M"]').should('be.checked');
        cy.get('#formSexo input[type="radio"][value="F"]').should('not.be.checked');
        cy.get('#formSexo').contains('Feminino').click();
        cy.get('#formSexo input[type="radio"][value="F"]').should('be.checked');
        cy.get('#formSexo input[type="radio"][value="M"]').should('not.be.checked');
    });

    it('Comida Favorita', () => {
        cy.get('#formComidaFavorita input[type="checkbox"][value="carne"]').should('not.be.checked');
        cy.get('#formComidaFavorita input[type="checkbox"][value="frango"]').should('not.be.checked');
        cy.get('#formComidaFavorita input[type="checkbox"][value="pizza"]').should('not.be.checked');
        cy.get('#formComidaFavorita input[type="checkbox"][value="vegetariano"]').should('not.be.checked');

        cy.get('#formComidaFavorita').contains('Carne').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="carne"]').should('be.checked');
        cy.get('#formComidaFavorita').contains('Frango').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="frango"]').should('be.checked');
        cy.get('#formComidaFavorita').contains('Pizza').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="pizza"]').should('be.checked');
        cy.get('#formComidaFavorita').contains('Vegetariano').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="vegetariano"]').should('be.checked');

        cy.get('#formComidaFavorita').contains('Carne').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="carne"]').should('not.be.checked');
        cy.get('#formComidaFavorita').contains('Frango').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="frango"]').should('not.be.checked');
        cy.get('#formComidaFavorita').contains('Pizza').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="pizza"]').should('not.be.checked');
        cy.get('#formComidaFavorita').contains('Vegetariano').click();
        cy.get('#formComidaFavorita input[type="checkbox"][value="vegetariano"]').should('not.be.checked');
    });

    it('Selecionando dropdown', () => {
        cy.get('#formEscolaridade').select('1o grau incompleto').should('have.value', '1grauincomp');
        cy.get('#formEscolaridade').select('1o grau completo').should('have.value', '1graucomp');
        cy.get('#formEscolaridade').select('2o grau incompleto').should('have.value', '2grauincomp');
        cy.get('#formEscolaridade').select('2o grau completo').should('have.value', '2graucomp');
        cy.get('#formEscolaridade').select('Superior').should('have.value', 'superior');
        cy.get('#formEscolaridade').select('Especializacao').should('have.value', 'especializacao');
        cy.get('#formEscolaridade').select('Mestrado').should('have.value', 'mestrado');
        cy.get('#formEscolaridade').select('Doutorado').should('have.value', 'doutorado');
    });

    it('Selecionando dataset', () => {
        cy.get('#formEsportes > option')
            .should('have.length.greaterThan', 0)
            .its('length')
            .then((n) => {
                console.log('Número de linhas na tabela:', n);
                for (let i = 0; i < n; i++) {
                    cy.get(`#formEsportes > :nth-child(${i + 1})`)
                        .invoke('val')
                        .then((text) => {
                            cy.get('#formEsportes').select(text);
                        });
                }
            });
    });

    describe('Tabela', () => {
        it('Selecionando CheckBoxes da Tabela', () => {
            cy.get('#tabelaUsuarios > tbody > tr')
                .should('have.length.greaterThan', 0)
                .its('length')
                .then((n) => {
                    console.log('Número de linhas na tabela:', n);
                    for (let i = 0; i < n; i++) {
                        cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) input[type="checkbox"]`).click();
                    }
                });
        });

        it('Selecionando Radio da Tabela', () => {
            cy.get('#tabelaUsuarios > tbody > tr')
                .should('have.length.greaterThan', 0)
                .its('length')
                .then((n) => {
                    console.log('Número de linhas na tabela:', n);
                    for (let i = 0; i < n; i++) {
                        cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) input[type="radio"]`).click();
                    }
                });
        });
    });
});
