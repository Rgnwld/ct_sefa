# Relatório de Testes Realizados

Este projeto contém uma suíte de testes automatizados utilizando Cypress para validação de funcionalidades de formulários web e APIs REST públicas. Abaixo estão listados todos os testes realizados, organizados por categoria, com uma breve descrição de cada um.

---

## Testes de Botões

-   **Cabeçalho**:

    -   **Clique Me!**: Valida se o botão altera o texto ao ser clicado.
    -   **Botão com Delay**: Verifica se o valor do botão muda após um atraso.
    -   **Botão com Contador**: Testa o incremento do valor do botão a cada clique.
    -   **Listagem com Delay**: Garante que itens são adicionados à lista após clicar no botão.
    -   **Botão Nova Aba**: Simula abertura de nova aba e interação com a página aberta.
    -   **Resposta Demorada**: Valida a criação dinâmica de um campo após clique.
    -   **Hora Certa**: Confirma se a data/hora exibida está no formato correto e próxima do horário atual.
    -   **Tempo Corrido**: Verifica se o tempo exibido corresponde ao esperado.

-   **Formulário**:

    -   **Botões em Tabela**: Testa a interação com botões em linhas de tabela e valida alertas exibidos.

-   **Rodapé**:
    -   **Alerta Simples**: Valida a exibição de alertas.
    -   **Confirmação Simples**: Testa respostas para confirmação (OK/Cancel) e mensagens exibidas.
    -   **Prompt**: Simula respostas em prompts e valida o comportamento.
    -   **Voltar**: Testa o botão de voltar e valida o resultado exibido.
    -   **Popup Nova Aba**: Garante que o link abre a página correta em nova aba.

---

## Testes de Formulário

-   **Cadastro Funcional**:

    -   Preenche o formulário com dados válidos e valida se o cadastro é realizado corretamente.

-   **Múltiplos Cadastros**:

    -   Realiza alterações em cadastros existentes com diferentes dados, validando cada alteração.

-   **Cadastros Não Funcionais**:
    -   **Nome Vazio**: Tenta cadastrar sem preencher o nome e valida a mensagem de erro.
    -   **Sobrenome Vazio**: Tenta cadastrar sem preencher o sobrenome e valida a mensagem de erro.
    -   **Sexo Vazio**: Tenta cadastrar sem selecionar o sexo e valida a mensagem de erro.
    -   **Vegetariano com Escolhas Conflitantes**: Seleciona opções conflitantes (ex: carne e vegetariano) e valida o alerta exibido.

---

## Testes de Inputs

-   **Campos de Texto**:

    -   Preenche e valida campos de texto simples e em tabelas dinâmicas.

-   **Seleção de Sexo**:

    -   Testa a seleção de opções de rádio para sexo e valida o estado dos botões.

-   **Comida Favorita**:

    -   Marca e desmarca checkboxes de comidas favoritas, validando o estado de cada opção.

-   **Dropdowns**:

    -   Seleciona diferentes opções em dropdowns e valida o valor selecionado.

-   **Dataset**:

    -   Interage com opções dinâmicas de dataset e valida a seleção.

-   **Tabela**:
    -   Seleciona rádios e checkboxes em tabelas dinâmicas, validando a interação.

---

## Testes de API (FakeRestAPI)

-   **Atividades**:

    -   **GET**: Lista todas as atividades e busca atividade específica.
    -   **POST**: Cria nova atividade.
    -   **PUT**: Atualiza atividade existente.
    -   **DELETE**: Exclui atividade.
    -   **Casos de Erro**: Testa criação com ID existente, atualização sem ID, atualização com IDs inconsistentes, e exclusão de ID inexistente.

-   **Autores**:

    -   **GET**: Lista todos os autores e busca autor específico.
    -   **POST**: Cria novo autor.
    -   **PUT**: Atualiza autor existente.
    -   **DELETE**: Exclui autor.
    -   **Casos de Erro**: Testa criação com ID existente, atualização sem ID, atualização com IDs inconsistentes, e exclusão de ID inexistente.

-   **Capas de Livros**:

    -   **GET**: Lista todas as capas, busca capa específica e capas por livro.
    -   **POST**: Cria nova capa.
    -   **PUT**: Atualiza capa existente.
    -   **DELETE**: Exclui capa.
    -   **Casos de Erro**: Testa criação com ID existente, atualização sem ID, atualização com IDs inconsistentes, e exclusão de ID inexistente.

-   **Livros**:

    -   **GET**: Lista todos os livros e busca livro específico.
    -   **POST**: Cria novo livro.
    -   **PUT**: Atualiza livro existente.
    -   **DELETE**: Exclui livro.
    -   **Casos de Erro**: Testa criação com ID existente, atualização sem ID, atualização com IDs inconsistentes, e exclusão de ID inexistente.

-   **Usuários**:
    -   **GET**: Lista todos os usuários e busca usuário específico.
    -   **POST**: Cria novo usuário.
    -   **PUT**: Atualiza usuário existente.
    -   **DELETE**: Exclui usuário.
    -   **Casos de Erro**: Testa criação com ID existente, atualização sem ID, atualização com IDs inconsistentes, e exclusão de ID inexistente.

---

## Uso de Fixtures

Os testes utilizam arquivos JSON na pasta `fixtures` para fornecer dados de entrada:

-   **`cadastro_exemplo.json`**: Dados para um único cadastro funcional.
-   **`cadastro_exemplos_multiplos.json`**: Dados para múltiplos cadastros.
-   **`cadastro_erro_vegetariano.json`**: Dados para teste de validação de vegetarianos.

---

## Comandos Customizados (`commands.ts`)

-   **`clearCheckboxes`**: Comando customizado para desmarcar checkboxes de acordo com o atributo name, facilitando a limpeza de campos em formulários dinâmicos.

---

## Problemas encontrados

-   ## **Teste_1**:
    -   Os Radio buttons da tabela não possuem o atributo "name", o que permite selecionar diversos.
-   ## **Teste_2**:
    -   Rotas apresentadas não dão o código do retorno de acordo com a atividade executada:
        -   Todas as rotas de criação, retornam o valor "200 (OK)" ao invés de "201 (Created)";
        -   Formas de Request não esperadas retornam valores de Success (2\*\*);
        -   Formas de Request com Corpo vazio retornam valores de Success (2\*\*);
