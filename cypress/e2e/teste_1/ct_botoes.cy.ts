describe('Botões', () => {
    const baseUrl = 'https://www.wcaquino.me/cypress/';
    const mainPage = baseUrl + 'componentes.html';

    beforeEach(() => {
        cy.visit(mainPage);
    });

    describe('Cabeçalho', () => {
        it('Clique Me!', () => {
            cy.get('#buttonSimple').click();
            cy.get('#buttonSimple').should('have.value', 'Obrigado!');
        });

        it('Botão com Delay', () => {
            cy.get('#buttonLazy').click();
            cy.get('#buttonLazy').should('have.value', 'zZz ZzZ!');
        });

        it('Botão com Delay + Contador', () => {
            var contador = '1';
            for (let i = 0; i < 3; i++) {
                contador += '1';
                cy.get('#buttonCount').click();
                cy.get('#buttonCount').should('have.value', `${contador}`);
            }
        });

        it('Listagem com Delay', () => {
            var maxItems = 2;
            cy.get('#lista li span').should('have.length', 0);
            cy.get('#buttonList').click();
            cy.get('#lista').should('exist');
            for (let i = 0; i < maxItems; i++) {
                cy.get('#lista li span').should('have.length', i + 1);
                cy.get('#lista li span')
                    .eq(i)
                    .should('have.text', `Item ${i + 1}`);
            }
        });

        it('Listagem DOM com Delay ', () => {
            var maxItems = 2;
            cy.get('#lista li span').should('have.length', 0);
            cy.get('#buttonListDOM').click();
            cy.get('#lista').should('exist');
            for (let i = 0; i < maxItems; i++) {
                cy.get('#lista li span').should('have.length', i + 1);
                cy.get('#lista li span')
                    .eq(i)
                    .should('have.text', `Item ${i + 1}`);
            }
        });

        it('Botão com Nova Aba', () => {
            const alertSpy = cy.spy();

            cy.visit(mainPage, {
                onBeforeLoad(win) {
                    // Evita a abertura de uma nova janela
                    // Realocando o método open para uma função vazia
                    cy.stub(win, 'open').as('openStub');
                },
            });

            cy.get('#buttonPopUp').click();
            cy.visit(baseUrl + 'frame.html');
            cy.get('#tfield').type('teste');
            cy.on('window:alert', alertSpy);
            cy.get('#otherButton')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Click OK!');
                });
        });

        it('Resposta Demorada', () => {
            cy.get('#novoCampo').should('not.exist');
            cy.get('#buttonDelay').click();
            cy.get('#novoCampo').should('exist');
            cy.get('#novoCampo').type('teste');
        });

        it('Hora Certa', () => {
            const dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);

            cy.get('#buttonNow').click();
            cy.get('#resultado > span')
                .invoke('text')
                .then((text) => {
                    expect(text).to.match(dateRegex);

                    const newTime = text.split(', ');
                    newTime[0] = newTime[0].split('/').reverse().join('-'); // Formata a data para YYYY-MM-DD
                    const newDate = newTime.join(' ');
                    console.log(newDate);

                    const tempo = new Date(newDate);
                    const agora = new Date();
                    const diff = agora.valueOf() - tempo.valueOf();

                    // Verifica se o tempo é menor que 2 segundos
                    expect(diff).to.be.lessThan(2000);
                });
        });

        it('Tempo corrido', () => {
            cy.get('#buttonTimePassed').click();
            const teste = cy
                .get('#resultado > span')
                .invoke('text')
                .then((text) => {
                    const tempo = new Date(Number(text));
                    const agora = new Date();

                    const diff = agora.valueOf() - tempo.valueOf();
                    // Verifica se o tempo é menor que 2 segundos
                    expect(diff).to.be.lessThan(2000);
                });
        });
    });

    describe('Formulario', () => {
        it('Selecionando botões da Tabela', () => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#tabelaUsuarios > tbody > tr')
                .should('have.length.greaterThan', 0)
                .its('length')
                .then((n) => {
                    console.log('Número de linhas na tabela:', n);
                    for (let i = 0; i < n; i++) {
                        cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) input[type="button"]`)
                            .click()
                            .then(() => {
                                cy.get(`#tabelaUsuarios > tbody > :nth-child(${i + 1}) > :nth-child(1)`)
                                    .invoke('text')
                                    .then((e) => {
                                        expect(alertSpy.getCall(i)).to.be.calledWith(e);
                                    });
                            });
                    }
                });
        });
    });

    describe('Botões do Rodapé', () => {
        it('Alerta Simples', () => {
            const alertSpy = cy.spy();
            cy.on('window:alert', alertSpy);

            cy.get('#alert')
                .click()
                .then(() => {
                    expect(alertSpy.getCall(0)).to.be.calledWith('Alert Simples');
                });
        });

        it('Confirmação Simples - Confirmado', () => {
            const alertSpy = cy.spy();
            const confirmStub = cy.stub();
            cy.on('window:alert', alertSpy); // Simula a confirmação
            cy.on('window:confirm', confirmStub.returns(true)); // Simula a confirmação

            cy.get('#confirm')
                .click()
                .then(() => {
                    expect(confirmStub.getCall(0)).to.be.calledWith('Confirm Simples');
                    expect(alertSpy.getCall(0)).to.be.calledWith('Confirmado');
                });
        });

        it('Confirmação Simples - Cancelado', () => {
            const alertSpy = cy.spy();
            const confirmStub = cy.stub();
            cy.on('window:alert', alertSpy); // Simula a confirmação
            cy.on('window:confirm', confirmStub.returns(false)); // Simula a confirmação

            cy.get('#confirm')
                .click()
                .then(() => {
                    expect(confirmStub.getCall(0)).to.be.calledWith('Confirm Simples');
                    expect(alertSpy.getCall(0)).to.be.calledWith('Negado');
                });
        });

        it('Prompt - OK', () => {
            let numero = 1;

            const alertSpy = cy.spy();
            const confirmStub = cy.stub();

            cy.window().then((win) => {
                cy.stub(win, 'prompt').returns(numero);
            });

            cy.on('window:confirm', confirmStub.returns(true)); // Simula a confirmação
            cy.on('window:alert', alertSpy);

            cy.get('#prompt')
                .click()
                .then(() => {
                    expect(confirmStub.getCall(0)).to.be.calledWith(`Era ${numero}?`);
                    expect(alertSpy.getCall(0)).to.be.calledWith(':D');
                });
        });

        it('Prompt - Erro', () => {
            let numero = 1;

            const alertSpy = cy.spy();
            const confirmStub = cy.stub();

            cy.window().then((win) => {
                cy.stub(win, 'prompt').returns(numero);
            });

            cy.on('window:confirm', confirmStub.returns(false)); // Simula a confirmação
            cy.on('window:alert', alertSpy);

            cy.get('#prompt')
                .click()
                .then(() => {
                    expect(confirmStub.getCall(0)).to.be.calledWith(`Era ${numero}?`);
                    expect(alertSpy.getCall(0)).to.be.calledWith(':(');
                });
        });

        it('Voltar', () => {
            cy.get('[href="#"]').click();
            cy.get('#resultado').contains('Voltou!');
        });

        it('Popup2 - Nova aba', () => {
            cy.get('[href="./frame.html"]').invoke('removeAttr', 'target').click();
            cy.url().should('include', '/frame.html');
        });
    });
});
