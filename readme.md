# Relatório de Testes Realizados

## Testes de Botões
- **Cabeçalho**:
  - Teste de clique no botão "Clique Me!" e validação do texto.
  - Teste de botão com delay e validação do valor.
  - Teste de botão com contador e validação do incremento.
  - Teste de listagem com delay e validação dos itens adicionados.
  - Teste de botão que abre uma nova aba e interação com a página aberta.
  - Teste de resposta demorada e validação de campo dinâmico.
  - Teste de exibição da hora certa e validação do formato e diferença de tempo.
  - Teste de tempo corrido e validação da diferença de tempo.

- **Formulário**:
  - Teste de interação com botões em uma tabela e validação de alertas.

- **Rodapé**:
  - Teste de alertas simples e confirmação.
  - Teste de prompts com diferentes respostas.
  - Teste de botão "Voltar" e validação do resultado.
  - Teste de botão que abre uma nova aba para uma página específica.

---

## Testes de Formulário
- **Cadastro Funcional**:
  - Preenchimento de formulário com dados válidos e validação do resultado.

- **Múltiplos Cadastros**:
  - Alteração de cadastros existentes com diferentes dados e validação.

- **Cadastros Não Funcionais**:
  - Teste de formulário com campos obrigatórios vazios (nome, sobrenome, sexo).
  - Teste de validação para vegetarianos com escolhas conflitantes.

---

## Testes de Inputs
- **Campos de Texto**:
  - Preenchimento e validação de campos de texto.
  - Interação com campos de texto em tabelas dinâmicas.

- **Seleção de Sexo**:
  - Teste de seleção de opções de rádio.

- **Comida Favorita**:
  - Teste de seleção de checkboxes.

- **Dropdowns**:
  - Teste de seleção de opções em dropdowns.

- **Dataset**:
  - Teste de interação com opções de dataset dinâmico.

- **Tabela**:
  - Teste de seleção de rádios e checkboxes em tabelas dinâmicas.

---

## Uso de Fixtures
Os testes utilizam arquivos JSON na pasta `fixtures` para fornecer dados de entrada:
- **`cadastro_exemplo.json`**: Dados para um único cadastro funcional.
- **`cadastro_exemplos_multiplos.json`**: Dados para múltiplos cadastros.
- **`cadastro_erro_vegetariano.json`**: Dados para teste de validação de vegetarianos.

---

## Comandos Customizados (`commands.ts`)
- **`clearCheckboxes`**: Comando customizado para desmarcar checkboxes de acordo com o atributo name.