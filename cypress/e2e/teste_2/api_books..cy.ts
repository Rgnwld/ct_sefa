describe('Requisições à API', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';

    describe('Atividades', () => {
        const url = baseUrl + 'Activities';
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
                method: 'POST',
                url: `${url}`,
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

    describe('Autores', () => {
        const url = baseUrl + 'Authors';

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

    describe('Livros', () => {
        const url = baseUrl + 'Books';

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

    describe('Fotos da Capa', () => {
        const url = baseUrl + 'CoverPhotos';
        it('Receber Lista de Capas', () => {
            const options = {
                method: 'GET',
                url: `${url}`,
            };

            cy.request('GET', url).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys('id', 'idBook', 'url');
            });
        });

        it('Receber Capa Específica', () => {
            const coverId = 1;
            const options = {
                method: 'GET',
                url: `${url}/${coverId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'url');
            });
        });

        it('Receber Capa de Livro', () => {
            const bookId = 1; // Altere para o ID do livro que deseja testar (1-10)
            const options = {
                method: 'GET',
                url: `${url}/books/covers/${bookId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0]).to.be.an('object');
                expect(response.body[0]).to.have.all.keys('id', 'idBook', 'url');
            });
        });

        it('Criar Capa', () => {
            const newCover = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/cover.jpg',
            };

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newCover,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'url');
            });
        });

        it('Atualizar Capas', () => {
            const updatedCover = {
                id: 1, // Altere para o ID da capa que deseja atualizar
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedCover.id}`,
                body: updatedCover,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.all.keys('id', 'idBook', 'url');
            });
        });

        it('Excluir Capas', () => {
            const coverId = 1; // Altere para o ID da capa que deseja testar (1-10)

            const options = {
                method: 'DELETE',
                url: `${url}/${coverId}`,
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(200);
                console.log(response.body);
            });
        });
    });

    describe('Usuários', () => {
        const url = baseUrl + 'Users';

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
});
