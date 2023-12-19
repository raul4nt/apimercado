const clienteService = require("../service/cliente_service");

async function listarClientes(req, res) {
  try {
    const clientes = await clienteService.listarClientes();
    res.status(200).json(clientes); 
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
  }
}

async function inserirCliente(req, res) {
  const cliente = req.body;
  try {
    const novoCliente = await clienteService.inserirCliente(cliente);
    res.status(201).json({ cliente: novoCliente });
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
  }
}

async function buscarClientePorId(req, res) {
  const id = +req.params.id;
  try {
    const cliente = await clienteService.buscarClientePorId(id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
  }
}

async function atualizarCliente(req, res) {
  const id = req.params.id;
  const cliente = req.body;
  try {
    await clienteService.atualizarCliente(id, cliente);
    res.status(200).json({ mensagem: "Cliente atualizado com sucesso." });
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
  }
}

async function deletarCliente(req, res) {
  const id = req.params.id;
  try {
    await clienteService.deletarCliente(id);
    res.status(200).json({ mensagem: "Cliente deletado com sucesso." });
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
  }
}

async function infoCliente(req, res) {
  const clienteId = req.params.clienteId;

  try {
    const infoCliente = await clienteService.infoCliente(clienteId);
    res.status(200).json({ infoCliente });
  } catch (error) {
    res.status(error.id || 500).json({ mensagem: error.message || "Erro interno do servidor" });
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
