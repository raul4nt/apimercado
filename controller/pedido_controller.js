const pedidoService = require("../service/pedido_service");

async function listarPedidos(req, res) {
  try {
    const listaPedidos = await pedidoService.listarPedidos();
    res.status(200).json(listaPedidos);
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function inserirPedido(req, res) {
  const pedido = req.body;
  try {
    await pedidoService.inserirPedido(pedido);
    res.status(201).json({ mensagem: "Seu pedido foi inserido" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function buscarPedidoPorId(req, res) {
  const id = +req.params.id;
  try {
    const pedido = await pedidoService.buscarPedidoPorId(id);
    res.json(pedido);
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function atualizarPedido(req, res) {
  const id = req.params.id;
  const pedido = req.body;
  try {
    await pedidoService.atualizarPedido(id, pedido);
    res.status(200).json({ mensagem: "Seu pedido foi atualizado" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function deletarPedido(req, res) {
  const id = req.params.id;
  try {
    await pedidoService.deletarPedido(id);
    res.status(200).json({ mensagem: "Seu pedido foi deletado" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

module.exports = {
  listarPedidos,
  inserirPedido,
  buscarPedidoPorId,
  atualizarPedido,
  deletarPedido,
};
