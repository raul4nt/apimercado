const pedidoRepository = require("../repository/pedido_repository");

async function listarPedidos() {
  return await pedidoRepository.listarPedidos();
}



async function inserirPedido(pedido) {
  if (pedido && pedido.cliente_id && pedido.produto_id && pedido.quantidade) {
    try {
      return await pedidoRepository.inserirPedido(pedido);
    } catch (error) {
      throw new Error(`ERRO: ${error.message}`);
    }
  } else {
    throw {
      id: 400,
      message: "Campos inválidos. Preencha com cliente_id, produto_id e quantidade.",
    };
  }
}

async function buscarPedidoPorId(id) {
  const pedido = await pedidoRepository.buscarPedidoPorId(id);
  if (pedido && pedido.length > 0) {
    return pedido;
  } else {
    throw { id: 404, message: "Pedido não encontrado" };
  }
}




async function atualizarPedido(id, pedido) {
  try {
    const pedidoEncontrado = await pedidoRepository.buscarPedidoPorId(id);
    if (pedidoEncontrado && pedidoEncontrado.length > 0) {
      if (pedido && pedido.cliente_id && pedido.produto_id && pedido.quantidade) {
        await pedidoRepository.atualizarPedido(id, pedido);
      } else {
        throw {
          id: 400,
          message: "Campos inválidos. Preencha com cliente_id, produto_id e quantidade.",
        };
      }
    } else {
      throw { id: 404, message: "Este pedido não existe" };
    }
  } catch (error) {
    throw {
      id: error.id || 500,
      message: error.message || "Erro interno do servidor",
    };
  }
}



async function deletarPedido(id) {
  const pedido = await pedidoRepository.buscarPedidoPorId(id);
  if (pedido && pedido.length > 0) {
    await pedidoRepository.deletarPedido(id);
  } else {
    throw { id: 404, message: "Este pedido não existe" };
  }
}


async function pedidosCliente(clienteId) {
  try {
    const pedidosDoCliente = await pedidoRepository.pedidosCliente(clienteId);
    return pedidosDoCliente;
  } catch (error) {
    throw new Error(`ERRO: ${error.message}`);
  }
}

async function pedidosData(data) {
  try {
    const pedidos = await pedidoRepository.pedidosData(data);

    if (pedidos.length === 0) {
      throw { id: 404, message: "Nenhum pedido feito nesta data." };
    }

    return pedidos;
  } catch (error) {
    throw new Error(`Erro ao listar pedidos por data: ${error.message}`);
  }
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
