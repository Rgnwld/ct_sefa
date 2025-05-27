describe('Formulário', () => {
    const baseUrl = 'https://www.wcaquino.me/cypress/';
    const mainPage = baseUrl + 'componentes.html';

    beforeEach(() => {
        cy.visit(mainPage);
    });

    it('Cadastro Funcional', () => {
        cy.fixture('teste_1/cadastro_exemplo').then((data) => {
            cy.get('#formNome').type(data.nome);
            cy.get('#formSobrenome').type(data.sobrenome);
            cy.get(`#formSexo input[type="radio"][value="${data.sexo}"]`).click();
            data.comida.forEach((comida) => {
                cy.get('#formComidaFavorita').contains(comida).click();
            });
            cy.get('#formEscolaridade').select(data.escolaridade);
            cy.get(`#formEsportes`).select(data.esporte);
            cy.get('#elementosForm\\:sugestoes').type(data.sugestao);
            cy.get('#formCadastrar').click();

            cy.get('#resultado').contains('Cadastrado!');

            cy.get('#descNome').contains(data.nome);
            cy.get('#descSobrenome').contains(data.sobrenome);
            cy.get('#descSexo').contains(data.sexo === 'M' ? 'Masculino' : 'Feminino');
            cy.get('#descComida').contains(data.comida.join(' '));
            cy.get('#descEscolaridade').contains(data.escolaridade);
            cy.get('#descEsportes').contains(data.esporte);
            cy.get('#descSugestoes').contains(data.sugestao);
        });
    });

    it('Multiplos Cadastros Funcionais - Alteração de Cadastro Existente', () => {
        cy.fixture('teste_1/cadastro_exemplos_multiplos').then((data) => {
            data.map((item) => {
                cy.get('#formNome').clear().type(item.nome);
                cy.get('#formSobrenome').clear().type(item.sobrenome);
                cy.get(`#formSexo input[type="radio"][value="${item.sexo}"]`).click();
                cy.clearCheckboxes('formComidaFavorita');

                item.comida.forEach((comida) => {
                    cy.get('#formComidaFavorita').contains(comida).click();
                });
                cy.get('#formEscolaridade').select(item.escolaridade);
                cy.get(`#formEsportes`).select(item.esporte);
                cy.get('#elementosForm\\:sugestoes').clear().type(item.sugestao);
                cy.get('#formCadastrar').click();

                cy.get('#resultado').contains('Cadastrado!');

                cy.get('#descNome').contains(item.nome);
                cy.get('#descSobrenome').contains(item.sobrenome);
                cy.get('#descSexo').contains(item.sexo === 'M' ? 'Masculino' : 'Feminino');
                cy.get('#descComida').contains(item.comida.join(' '));
                cy.get('#descEscolaridade').contains(item.escolaridade);
                cy.get('#descEsportes').contains(item.esporte);
                cy.get('#descSugestoes').contains(item.sugestao);
            });
        });
    });

    it('Cadastro Não Funcional - Nome Vazio', () => {
        cy.fixture('teste_1/cadastro_exemplo').then((data) => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#formSobrenome').type(data.sobrenome);
            cy.get(`#formSexo input[type="radio"][value="${data.sexo}"]`).click();
            data.comida.forEach((comida) => {
                cy.get('#formComidaFavorita').contains(comida).click();
            });
            cy.get('#formEscolaridade').select(data.escolaridade);
            cy.get(`#formEsportes`).select(data.esporte);
            cy.get('#elementosForm\\:sugestoes').type(data.sugestao);

            cy.get('#formCadastrar')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Nome eh obrigatorio');
                });

            cy.get('#resultado').should('not.have.text', 'Cadastrado!');
        });
    });

    it('Cadastro Não Funcional - Sobrenome Vazio', () => {
        cy.fixture('teste_1/cadastro_exemplo').then((data) => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#formNome').type(data.nome);
            cy.get(`#formSexo input[type="radio"][value="${data.sexo}"]`).click();
            data.comida.forEach((comida) => {
                cy.get('#formComidaFavorita').contains(comida).click();
            });
            cy.get('#formEscolaridade').select(data.escolaridade);
            cy.get(`#formEsportes`).select(data.esporte);
            cy.get('#elementosForm\\:sugestoes').type(data.sugestao);

            cy.get('#formCadastrar')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Sobrenome eh obrigatorio');
                });

            cy.get('#resultado').should('not.have.text', 'Cadastrado!');
        });
    });

    it('Cadastro Não Funcional - Sexo Vazio', () => {
        cy.fixture('teste_1/cadastro_exemplo').then((data) => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#formNome').type(data.nome);
            cy.get('#formSobrenome').type(data.sobrenome);
            data.comida.forEach((comida) => {
                cy.get('#formComidaFavorita').contains(comida).click();
            });
            cy.get('#formEscolaridade').select(data.escolaridade);
            cy.get(`#formEsportes`).select(data.esporte);
            cy.get('#elementosForm\\:sugestoes').type(data.sugestao);

            cy.get('#formCadastrar')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Sexo eh obrigatorio');
                });

            cy.get('#resultado').should('not.have.text', 'Cadastrado!');
        });
    });

    it('Cadastro Não Funcional - Vegetariano', () => {
        cy.fixture('teste_1/cadastro_erro_vegetariano').then((data) => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#formNome').type(data.nome);
            cy.get('[data-cy="dataSobrenome"]').type(data.sobrenome);
            cy.get(`#formSexo input[type="radio"][value="${data.sexo}"]`).click();
            data.comida.forEach((comida) => {
                cy.get('#formComidaFavorita').contains(comida).click();
            });
            cy.get('#formEscolaridade').select(data.escolaridade);
            cy.get(`#formEsportes`).select(data.esporte);
            cy.get('#elementosForm\\:sugestoes').type(data.sugestao);

            cy.get('#formCadastrar')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Tem certeza que voce eh vegetariano?');
                });

            cy.get('#resultado').should('not.have.text', 'Cadastrado!');
        });
    });
});
