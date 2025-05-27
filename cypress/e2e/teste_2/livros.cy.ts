describe('Livros', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';
    const url = baseUrl + 'Books';

    describe('Formas Esperadas', () => {
        it('Receber Lista de Livros', () => {
            cy.request('GET', url).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys(
                    'id',
                    'title',
                    'description',
                    'pageCount',
                    'excerpt',
                    'publishDate'
                );
            });
        });

        it('Receber Livro Específico', () => {
            const bookId = 1;
            const options = {
                method: 'GET',
                url: `${url}/${bookId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys(
                    'id',
                    'title',
                    'description',
                    'pageCount',
                    'excerpt',
                    'publishDate'
                );
            });
        });

        it('Criar Livro', () => {
            const newBook = {
                title: 'Novo Livro',
                description: 'Descrição do novo livro',
                pageCount: 300,
                excerpt: 'Resumo do novo livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys(
                    'id',
                    'title',
                    'description',
                    'pageCount',
                    'excerpt',
                    'publishDate'
                );
            });
        });

        it('Atualizar Livro', () => {
            const updatedBook = {
                id: 1, // Altere para o ID do livro que deseja atualizar
                title: 'Livro Atualizado',
                description: 'Descrição atualizada do livro',
                pageCount: 350,
                excerpt: 'Resumo atualizado do livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedBook.id}`,
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys(
                    'id',
                    'title',
                    'description',
                    'pageCount',
                    'excerpt',
                    'publishDate'
                );
            });
        });

        it('Excluir Livro', () => {
            const bookId = 1; // Altere para o ID do livro que deseja testar (1-10)

            const options = {
                method: 'DELETE',
                url: `${url}/${bookId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                console.log(response.body);
            });
        });
    });

    describe('Formas Não Esperadas', () => {
        it('Criar Um Livro Com ID já existente', () => {
            const newBook = {
                id: 1,
                title: 'Novo Livro',
                description: 'Descrição do novo livro',
                pageCount: 300,
                excerpt: 'Resumo do novo livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(403);
            });
        });

        it('Criar Um Livro Sem Corpo', () => {
            const newBook = {};

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Livro Sem ID no Corpo', () => {
            const bookId = 1; // Altere para o ID do livro que deseja atualizar

            const updatedBook = {
                title: 'Livro Atualizado',
                description: 'Descrição atualizada do livro',
                pageCount: 350,
                excerpt: 'Resumo atualizado do livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${bookId}`,
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Livro Sem ID no Params', () => {
            const updatedBook = {
                id: 1,
                title: 'Livro Atualizado',
                description: 'Descrição atualizada do livro',
                pageCount: 350,
                excerpt: 'Resumo atualizado do livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'PUT',
                url: `${url}`,
                body: updatedBook,
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

        it('Atualizar Livro Com ID inexistente ', () => {
            const updatedBook = {
                id: 9999,
                title: 'Livro Atualizado',
                description: 'Descrição atualizada do livro',
                pageCount: 350,
                excerpt: 'Resumo atualizado do livro',
                publishDate: '2023-12-31T00:00:00',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedBook.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedBook,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
                expect(response.status).to.eq(404);
            });
        });

        it('Atualizar Livro Com ID do Body e Params Diferentes', () => {
            const bookId = 1; // Altere para o ID da capa que deseja testar (1-10)

            const updatedBook = {
                id: 2, // Altere para o ID da capa que deseja atualizar
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${bookId}`,
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar Livro Sem Corpo', () => {
            const bookId = 1; // Altere para o ID da capa que deseja testar (1-10)

            const updatedBook = {};

            const options = {
                method: 'PUT',
                url: `${url}/${bookId}`,
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Excluir Livro com ID inexistente', () => {
            const bookId = 99; // ID que não existe

            const optionsGET = {
                method: 'GET',
                url: `${url}/${bookId}`,
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
                url: `${url}/${bookId}`,
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
