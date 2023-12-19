const { Client } = require('pg');
const moment = require('moment');

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'crudMercado'
};

async function listarPedidos() {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "SELECT * FROM pedidos ORDER BY id";
    const result = await cliente.query(sql);
    await cliente.end();
    return result.rows;
}


async function inserirPedido(pedido) {
  const cliente = new Client(conexao);

  try {
    await cliente.connect();

    const buscaCliente = await cliente.query("SELECT * FROM clientes WHERE cliente_id = $1", [pedido.cliente_id]);

    if (buscaCliente.rows.length === 0) {
      throw new Error(`Cliente com ID ${pedido.cliente_id} não encontrado.`);
    }

    const buscaProduto = await cliente.query("SELECT * FROM produtos WHERE id = $1", [pedido.produto_id]);

    if (buscaProduto.rows.length === 0) {
      throw new Error(`Produto com ID ${pedido.produto_id} não encontrado.`);
    }

    const produto = buscaProduto.rows[0];

    if (!produto.disponivel) {
      throw new Error("Produto não está disponível.");
    }

    const precoProduto = produto.preco;

    const valorTotal = pedido.quantidade * precoProduto;

    const dataPedido = moment().format('YYYY-MM-DD');
    const horaPedido = moment().format('HH:mm:ss');

    const sql = "INSERT INTO pedidos (cliente_id, produto_id, quantidade, valor_total, data_pedido, hora_pedido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [pedido.cliente_id, pedido.produto_id, pedido.quantidade, valorTotal, dataPedido, horaPedido];
    const result = await cliente.query(sql, values);

    return result.rows;
  } catch (error) {
    throw new Error(`Inserção de pedido falhou: ${error.message}`);
  } finally {
    await cliente.end();
  }
}



async function buscarPedidoPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "SELECT * FROM pedidos WHERE id = $1";
    const values = [id];
    const result = await cliente.query(sql, values);
    await cliente.end();
    return result.rows;
}



async function atualizarPedido(id, pedido) {
    const cliente = new Client(conexao);
  
    try {
      await cliente.connect();
  
      const buscaCliente = await cliente.query("SELECT * FROM clientes WHERE cliente_id = $1", [pedido.cliente_id]);
  
      if (buscaCliente.rows.length === 0) {
        throw new Error(`Cliente com ID ${pedido.cliente_id} não encontrado.`);
      }
  
      const buscaProduto = await cliente.query("SELECT preco FROM produtos WHERE id = $1", [pedido.produto_id]);
  
      if (buscaProduto.rows.length === 0) {
        throw new Error(`Produto com ID ${pedido.produto_id} não encontrado.`);
      }
  
      const precoProduto = buscaProduto.rows[0].preco;
  
      const valorTotal = pedido.quantidade * precoProduto;
  
      const sql = "UPDATE pedidos SET cliente_id = $1, produto_id = $2, quantidade = $3, valor_total = $4 WHERE id = $5";
      const values = [pedido.cliente_id, pedido.produto_id, pedido.quantidade, valorTotal, id];
      await cliente.query(sql, values);
  
      return { mensagem: "Pedido atualizado com sucesso." };
    } catch (error) {
      throw new Error(`Erro ao atualizar o pedido: ${error.message}`);
    } finally {
      await cliente.end();
    }
  }
  

  
async function deletarPedido(id) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM pedidos WHERE id = $1";
    const values = [id];
    await cliente.query(sql, values);
    cliente.end();
}



async function pedidosCliente(clienteId) {
  const cliente = new Client(conexao);

  try {
    await cliente.connect();

    const buscaCliente = await cliente.query("SELECT * FROM clientes WHERE cliente_id = $1", [clienteId]);

    if (buscaCliente.rows.length === 0) {
      throw { id: 404, message: "Cliente não encontrado" };
    }

    const buscaPedidos = await cliente.query("SELECT * FROM pedidos WHERE cliente_id = $1", [clienteId]);

    return buscaPedidos.rows;
  } catch (error) {
    throw new Error(`Busca de pedidos falhou: ${error.message}`);
  } finally {
    await cliente.end();
  }
}

async function pedidosData(data) {
  const cliente = new Client(conexao);
  await cliente.connect();

  const sql = "SELECT * FROM pedidos WHERE data_pedido = $1 ORDER BY id";
  const values = [data];
  const result = await cliente.query(sql, values);

  await cliente.end();
  return result.rows;
}

module.exports = {
    listarPedidos,
    inserirPedido,
    buscarPedidoPorId,
    atualizarPedido,
    deletarPedido,
    pedidosCliente,
    pedidosData
};


