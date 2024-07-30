# API Mercado 

Este repositório contém um conjunto de serviços e APIs para gerenciamento de clientes, pedidos e produtos, desenvolvido como projeto final para a disciplina de **Desenvolvimento de Serviços e APIs** no terceiro semestre de faculdade.

## Funcionalidades Gerais

### Cliente
- **Listar Clientes**: `GET /clientes`
- **Inserir Cliente**: `POST /clientes`
- **Buscar Cliente por ID**: `GET /clientes/:id`
- **Atualizar Cliente**: `PUT /clientes/:id`
- **Deletar Cliente**: `DELETE /clientes/:id`
- **Informações do Cliente**: `GET /clientes/:clienteId/info`

### Pedido
- **Listar Pedidos**: `GET /pedidos`
- **Inserir Pedido**: `POST /pedidos`
- **Buscar Pedido por ID**: `GET /pedidos/:id`
- **Atualizar Pedido**: `PUT /pedidos/:id`
- **Deletar Pedido**: `DELETE /pedidos/:id`
- **Pedidos por Cliente**: `GET /pedidos/clientes/:clienteId`
- **Pedidos por Data**: `GET /pedidos/data/:data`

### Produto
- **Listar Produtos**: `GET /produtos`
- **Inserir Produto**: `POST /produtos`
- **Buscar Produto por ID**: `GET /produtos/:id`
- **Atualizar Produto**: `PUT /produtos/:id`
- **Deletar Produto**: `DELETE /produtos/:id`
- **Atualizar Preço do Produto**: `PUT /produtos/:id/preco`
- **Marcar Produto como Indisponível**: `PUT /produtos/:id/indisponivel`

## Estrutura do Projeto

- **Controllers**: Implementa as rotas e controla a lógica de requisições e respostas.
  - `clienteController.js`
  - `pedidoController.js`
  - `produtoController.js`

- **Repositories**: Manipula diretamente a base de dados.
  - `clienteRepository.js`
  - `pedidoRepository.js`
  - `produtoRepository.js`

- **Services**: Contém a lógica de negócio e comunicação com os repositórios.
  - `clienteService.js`
  - `pedidoService.js`
  - `produtoService.js`

## Requisitos

- Node.js
- PostgreSQL

