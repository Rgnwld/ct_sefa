describe('Autores', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';
    const url = baseUrl + 'Authors';
    describe('Formas Esperadas', () => {
        it('Receber Lista de Autores', () => {
            // Requisição para obter a lista de autores
            cy.request('GET', url).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys('id', 'idBook', 'firstName', 'lastName');
            });
        });

        it('Receber Autores Específico', () => {
            const authorId = 1; // Altere para o ID do autor que deseja testar (1-10)
            const options = {
                method: 'GET',
                url: `${url}/${authorId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'firstName', 'lastName');
            });
        });

        it('Criar Autores', () => {
            const newAuthor = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Novo',
                lastName: 'Autor',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newAuthor,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'firstName', 'lastName');
            });
        });

        it('Atualizar Autores', () => {
            const updatedAuthor = {
                id: 1, // Altere para o ID do autor que deseja atualizar
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Autor Atualizado',
                lastName: 'Sobrenome Atualizado',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedAuthor.id}`,
                body: updatedAuthor,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'firstName', 'lastName');
            });
        });

        it('Excluir Autores', () => {
            const authorId = 1; // Altere para o ID do autor que deseja testar (1-10)

            const options = {
                method: 'DELETE',
                url: `${url}/${authorId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                console.log(response.body);
            });
        });
    });

    describe('Formas Não Esperadas', () => {
        it('Criar Um Autor com ID já existente', () => {
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
                expect(response.status).to.eq(403);
            });
        });

        it('Atualizar Autor Sem ID no Corpo', () => {
            const authorId = 1;

            const updatedAuthor = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Autor Atualizado',
                lastName: 'Sobrenome Atualizado',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${authorId}`,
                body: updatedAuthor,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Autor Sem Params ', () => {
            const updatedAuthor = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Autor Atualizado',
                lastName: 'Sobrenome Atualizado',
            };

            const options = {
                method: 'PUT',
                url: `${url}/`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedAuthor,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(405);
            });
        });

        it('Atualizar Autor Com ID inexistente ', () => {
            const updatedAuthor = {
                id: 9999, // Altere para um ID que não existe
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Autor Atualizado',
                lastName: 'Sobrenome Atualizado',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedAuthor.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedAuthor,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(404);
            });
        });

        it('Atualizar Autor Com ID do Corpo e Params Diferentes', () => {
            const authorId = 1;

            const updatedAuthor = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                firstName: 'Autor Atualizado',
                lastName: 'Sobrenome Atualizado',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${authorId}`,
                body: updatedAuthor,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Excluir Autor com ID inexistente', () => {
            const authorId = 99; // ID que não existe

            const optionsGET = {
                method: 'GET',
                url: `${url}/${authorId}`,
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
                url: `${url}/${authorId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
            };

            cy.request(optionsDelete).then((response) => {
                expect(response.status).to.eq(404);
            });
        });
    });
});
