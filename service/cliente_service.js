const clienteRepository = require("../repository/cliente_repository");

async function listarClientes() {
  try {
    return await clienteRepository.listarClientes();
  } catch (error) {
    throw new Error(`Erro ao listar clientes: ${error.message}`);
  }
}

async function inserirCliente(cliente) {
  try {
    return await clienteRepository.inserirCliente(cliente);
  } catch (error) {
    throw new Error(`ERRO: ${error.message}`);
  }
}


async function buscarClientePorId(id) {
  try {
    const cliente = await clienteRepository.buscarClientePorId(id);
    if (cliente && cliente.length > 0) {
      return cliente[0];
    } else {
      throw { id: 404, message: `Cliente com ID ${id} não encontrado` };
    }
  } catch (error) {
    throw new Error(`Erro ao buscar cliente: ${error.message}`);
  }
}

async function atualizarCliente(id, cliente) {
  try {
    const clienteExistente = await clienteRepository.buscarClientePorId(id);

    if (!clienteExistente || clienteExistente.length === 0) {
      throw { id: 404, message: "Cliente não encontrado" };
    }

    return await clienteRepository.atualizarCliente(id, cliente);
  } catch (error) {
    throw new Error(`Erro ao atualizar cliente: ${error.message}`);
  }
}


async function deletarCliente(id) {
  try {
    const clienteExistente = await clienteRepository.buscarClientePorId(id);

    if (!clienteExistente || clienteExistente.length === 0) {
      throw { id: 404, message: "Cliente não encontrado" };
    }

    return await clienteRepository.deletarCliente(id);
  } catch (error) {
    throw new Error(`Erro ao deletar cliente: ${error.message}`);
  }
}

async function infoCliente(clienteId) {
  try {
    const clienteEncontrado = await clienteRepository.infoCliente(clienteId);

    if (!clienteEncontrado) {
      throw { id: 404, message: "Cliente não encontrado" };
    }

    const infoCliente = await clienteRepository.infoCliente(clienteId);
    return infoCliente;
  } catch (error) {
    throw new Error(`Erro ao calcular as informações do cliente: ${error.message}`);
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
