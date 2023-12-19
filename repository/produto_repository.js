const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'crudMercado'
};

async function listarProdutos() {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "SELECT * FROM produtos ORDER BY id";
    const result = await cliente.query(sql);
    await cliente.end();
    return result.rows;
}

async function inserirProduto(produto) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO produtos (nome_produto, marca, preco, disponivel) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [produto.nome_produto, produto.marca, produto.preco, true];
    res = await cliente.query(sql, values);
    cliente.end();
}

async function buscarProdutoPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "SELECT * FROM produtos WHERE id = $1";
    const values = [id];
    const result = await cliente.query(sql, values);
    await cliente.end();
    return result.rows;
}

async function atualizarProduto(id, produto) {
    const cliente = new Client(conexao);
    cliente.connect();
    const sql = "UPDATE produtos SET nome_produto = $1, marca = $2, preco = $3 WHERE id = $4";
    const values = [produto.nome_produto, produto.marca, produto.preco, id];
    res = await cliente.query(sql, values);
    cliente.end();
}

async function deletarProduto(id) {
    const cliente = new Client(conexao);
    cliente.connect();
    const sql = "DELETE FROM produtos WHERE id = $1";
    const values = [id];
    res = await cliente.query(sql, values);
    cliente.end();
}

async function produtoIndisponivel(id) {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "UPDATE produtos SET disponivel = false WHERE id = $1";
    const values = [id];
    await cliente.query(sql, values);
    await cliente.end();
}

async function atualizarPreco(id, novoPreco) {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "UPDATE produtos SET preco = $1 WHERE id = $2";
    const values = [novoPreco, id];
    await cliente.query(sql, values);
    await cliente.end();
}

// ...

module.exports = {
    listarProdutos,
    inserirProduto,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto,
    produtoIndisponivel,
    atualizarPreco
};
