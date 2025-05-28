describe('Atividades', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';
    const url = baseUrl + 'Activities';
    describe('Formas Esperadas', () => {
        it('Receber Lista de Atividades', () => {
            cy.request('GET', url).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys('id', 'title', 'dueDate', 'completed');
            });
        });

        it('Receber Atividades Específica', () => {
            const activityId = 1;
            const options = {
                method: 'GET',
                url: `${url}/${activityId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'title', 'dueDate', 'completed');
            });
        });

        it('Criar Atividades', () => {
            const newActivity = {
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'title', 'dueDate', 'completed');
            });
        });

        it('Atualizar Atividades', () => {
            const updatedActivity = {
                id: 1,
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedActivity.id}`,
                body: updatedActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'title', 'dueDate', 'completed');
            });
        });

        it('Excluir Atividades', () => {
            const activityId = 1; // Altere para o ID da atividade que deseja testar (1-10)

            const options = {
                method: 'DELETE',
                url: `${url}/${activityId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    describe('Formas Não Esperadas', () => {
        it('Criar Atividade Com ID já existente', () => {
            const newActivity = {
                id: 1,
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Criar Atividade Sem Corpo', () => {
            const newActivity = {};

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Atividade Sem ID no Corpo', () => {
            const activityId = 1; // Altere para o ID da atividade que deseja testar (1-10)

            const updatedActivity = {
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'PUT',
                url: `${url}/${activityId}`,
                body: updatedActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Atividade Sem Params', () => {
            const updatedActivity = {
                id: 3,
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'PUT',
                url: `${url}/`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedActivity,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(405);
            });
        });

        it('Atualizar Atividade Com ID inexistente', () => {
            const updatedActivity = {
                id: 99,
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedActivity.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedActivity,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(404);
            });
        });

        it('Atualizar Atividade Com ID do Corpo e Params Diferentes', () => {
            const activityId = 1; // Altere para o ID da atividade que deseja testar (1-10)

            const updatedActivity = {
                id: 3,
                title: 'Nova Atividade',
                dueDate: '2023-12-31T00:00:00',
                completed: false,
            };

            const options = {
                method: 'PUT',
                url: `${url}/${activityId}`,
                body: updatedActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Atividade Sem Corpo', () => {
            const activityId = 1; // Altere para o ID da atividade que deseja testar (1-10)

            const updatedActivity = {};

            const options = {
                method: 'PUT',
                url: `${url}/${activityId}`,
                body: updatedActivity,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Excluir Atividade com ID inexistente', () => {
            const activityId = 9999; // ID que não existe

            const optionsGET = {
                method: 'GET',
                url: `${url}/${activityId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            };

            //Valida a não existência do ID
            cy.request(optionsGET).should((response) => {
                expect(response.status).to.eq(404);
            });

            const optionsDelete = {
                method: 'DELETE',
                url: `${url}/${activityId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            };

            cy.request(optionsDelete).should((response) => {
                expect(response.status).to.eq(404);
            });
        });
    });
});
