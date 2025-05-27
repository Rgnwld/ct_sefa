describe('Usuários', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';
    const url = baseUrl + 'Users';
    describe('Formas Esperada', () => {
        it('Receber Lista de Usuários', () => {
            const options = {
                method: 'GET',
                url: `${url}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys('id', 'userName', 'password');
            });
        });

        it('Receber Usuário Especifico', () => {
            const userId = 1; // Altere para o ID do usuário que deseja testar (1-10)
            const options = {
                method: 'GET',
                url: `${url}/${userId}`,
            };
            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'userName', 'password');
            });
        });

        it('Criar Usuário', () => {
            const newUser = {
                userName: 'Novo usuário',
                password: 'Nova Senha',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'userName', 'password');
            });
        });

        it('Atualizar Usuário', () => {
            const userId = 1; // Altere para o ID do usuário que deseja testar (1-10)

            const updatedUser = {
                id: userId,
                userName: 'UpdatedUser',
                password: 'UpdatedPassword',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${userId}`,
                body: updatedUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('id', userId);
                expect(response.body).to.have.all.keys('id', 'userName', 'password');
                console.log(response.body);
            });
        });

        it('Excluir Usuário', () => {
            const userId = 1; // Altere para o ID do usuário que deseja testar (1-10)

            const options = {
                method: 'DELETE',
                url: `${url}/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                console.log(response.body);
            });
        });
    });

    describe('Formas Não Esperadas', () => {
        it('Criar Um Usuário com ID já existente', () => {
            const newUser = {
                id: 1,
                userName: 'Novo usuário',
                password: 'Nova Senha',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(403);
            });
        });

        it('Atualizar Usuário Sem ID no Corpo', () => {
            const userId = 1; // Altere para o ID do Usuário que deseja atualizar

            const updatedUser = { userName: 'Novo usuário', password: 'Nova Senha' };

            const options = {
                method: 'PUT',
                url: `${url}/${userId}`,
                body: updatedUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Usuário Sem ID no Params', () => {
            const updatedUser = {
                id: 1,
                userName: 'Novo usuário',
                password: 'Nova Senha',
            };

            const options = {
                method: 'PUT',
                url: `${url}`,
                body: updatedUser,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
                expect(response.status).to.eq(405);
            });
        });

        it('Atualizar Usuário Com ID inexistente ', () => {
            const updatedUser = {
                id: 999999,
                userName: 'Novo usuário',
                password: 'Nova Senha',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedUser.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedUser,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
                expect(response.status).to.eq(404);
            });
        });

        it('Atualizar Usuário Com ID do Body e Params Diferentes', () => {
            const userId = 1; // Altere para o ID da capa que deseja testar (1-10)

            const updatedCover = {
                id: 2, // Altere para o ID da capa que deseja atualizar
                userName: 'Novo usuário',
                password: 'Nova Senha',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${userId}`,
                body: updatedCover,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Excluir Usuário com ID inexistente', () => {
            const userId = 99; // ID que não existe

            const optionsGET = {
                method: 'GET',
                url: `${url}/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            //Valida a não existência do ID
            cy.request(optionsGET).then((response) => {
                expect(response.status).to.eq(404);
            });

            const optionsDelete = {
                method: 'DELETE',
                url: `${url}/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            };

            cy.request(optionsDelete).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
                expect(response.status).to.eq(404);
            });
        });
    });
});
