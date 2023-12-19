const { Client } = require('pg');

const conexao = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'crudMercado',
};

async function listarClientes() {
  const cliente = new Client(conexao);
  await cliente.connect();

  const sql = "SELECT * FROM clientes ORDER BY cliente_id";
  const result = await cliente.query(sql);
  await cliente.end();
  return result.rows;
}

async function inserirCliente(cliente) {
  const clienteDb = new Client(conexao);
  await clienteDb.connect();

  try {
    if (!cliente.nome || !cliente.telefone || !cliente.cidade) {
      throw { id: 400, message: "Campos inválidos. Preencha com nome, telefone e cidade." };
    }

    const sql = "INSERT INTO clientes (nome, telefone, cidade) VALUES ($1, $2, $3) RETURNING *";
    const values = [cliente.nome, cliente.telefone, cliente.cidade];
    const result = await clienteDb.query(sql, values);

    return result.rows;
  } catch (error) {
    throw new Error(`Inserção de cliente falhou: ${error.message}`);
  } finally {
    await clienteDb.end();
  }
}

async function buscarClientePorId(id) {
  const cliente = new Client(conexao);
  await cliente.connect();

  const sql = "SELECT * FROM clientes WHERE cliente_id = $1";
  const values = [id];
  const result = await cliente.query(sql, values);
  await cliente.end();
  return result.rows;
}

async function atualizarCliente(id, cliente) {
  const clienteDb = new Client(conexao);
  await clienteDb.connect();

  const sql = "UPDATE clientes SET nome = $1, telefone = $2, cidade = $3 WHERE cliente_id = $4";
  const values = [cliente.nome, cliente.telefone, cliente.cidade, id];
  await clienteDb.query(sql, values);

  await clienteDb.end();
}

async function deletarCliente(id) {
  const cliente = new Client(conexao);
  await cliente.connect();

  const sql = "DELETE FROM clientes WHERE cliente_id = $1";
  const values = [id];
  await cliente.query(sql, values);

  await cliente.end();
}

async function infoCliente(clienteId) {
  const cliente = new Client(conexao);

  try {
    await cliente.connect();

    const buscaTotalGasto = await cliente.query("SELECT SUM(valor_total) AS total_gasto FROM pedidos WHERE cliente_id = $1", [clienteId]);
    const totalGasto = parseFloat(buscaTotalGasto.rows[0].total_gasto) || 0;

    const buscaQtPedidos = await cliente.query("SELECT COUNT(*) AS qt_pedidos FROM pedidos WHERE cliente_id = $1", [clienteId]);
    const qtPedidos = parseInt(buscaQtPedidos.rows[0].qt_pedidos) || 0;

    const gastoMedioPorPedido = qtPedidos > 0 ? totalGasto / qtPedidos : 0;

    const buscaCliente = await cliente.query("SELECT cliente_id, nome, telefone, cidade FROM clientes WHERE cliente_id = $1", [clienteId]);
    const clienteInfo = buscaCliente.rows[0];

    if (!clienteInfo) {
      return null; 
    }

    return { cliente_id: clienteInfo.cliente_id, nome: clienteInfo.nome, telefone: clienteInfo.telefone, cidade: clienteInfo.cidade, totalGasto, qtPedidos, gastoMedioPorPedido };
  } catch (error) {
    throw new Error(`Erro ao calcular as informações do cliente: ${error.message}`);
  } finally {
    await cliente.end();
  }
}

module.exports = {
  listarClientes,
  inserirCliente,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente,
  infoCliente
};
