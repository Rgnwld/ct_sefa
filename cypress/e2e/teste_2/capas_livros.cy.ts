describe('Fotos da Capa', () => {
    const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/';
    const url = baseUrl + 'CoverPhotos';

    describe('Formas Esperadas', () => {
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

    describe('Formas Não Esperadas', () => {
        it('Criar Uma Capa Com ID já existente', () => {
            const newCover = {
                id: 1,
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
                expect(response.status).to.eq(403);
            });
        });

        it('Criar Uma Capa Sem Corpo', () => {
            const newCover = {};

            const options = {
                method: 'POST',
                url: `${url}`,
                body: newCover,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            cy.request(options).then((response) => {
                expect(response.status).to.eq(403);
            });
        });

        it('Atualizar CAPA Sem ID no Corpo', () => {
            const coverId = 1; // Altere para o ID da capa que deseja atualizar

            const updatedCover = {
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${coverId}`,
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

        it('Atualizar CAPA Sem Params ', () => {
            const updatedCover = {
                id: 1,
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedCover,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(405);
            });
        });

        it('Atualizar CAPA Com ID inexistente ', () => {
            const updatedCover = {
                id: 9999,
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedCover.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedCover,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.eq(404);
            });
        });

        it('Atualizar CAPA Com IDBOOK inexistente ', () => {
            const updatedCover = {
                id: 1,
                idBook: 9999, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${updatedCover.id}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false,
                body: updatedCover,
            };

            cy.request(options).should((response) => {
                expect(response.status).to.not.eq(200);
                expect(response.status).to.not.eq(201);
            });
        });

        it('Atualizar CAPA Com ID do Body e Params Diferentes', () => {
            const coverId = 1; // Altere para o ID da capa que deseja testar (1-10)

            const updatedCover = {
                id: 2, // Altere para o ID da capa que deseja atualizar
                idBook: 1, // Altere para o ID do livro que deseja associar
                url: 'https://example.com/updated_cover.jpg',
            };

            const options = {
                method: 'PUT',
                url: `${url}/${coverId}`,
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

        it('Atualizar CAPA Sem Corpo', () => {
            const coverId = 1; // Altere para o ID da capa que deseja atualizar

            const updatedCover = {};

            const options = {
                method: 'PUT',
                url: `${url}/${coverId}`,
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

        it('Excluir CAPA com ID inexistente', () => {
            const coverId = 99; // ID que não existe

            const optionsGET = {
                method: 'GET',
                url: `${url}/${coverId}`,
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
                url: `${url}/${coverId}`,
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
