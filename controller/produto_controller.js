const produtoService = require("../service/produto_service");

async function listar(req, res) {
  const listaProdutos = await produtoService.listar();
  res.status(200).json(listaProdutos);
}

async function inserir(req, res) {
  let produto = req.body;
  try {  
    await produtoService.inserir(produto);
    res.status(201).json({ mensagem: "Seu produto foi inserido" });
  } catch (err) {
    res.status(err.id).json({ mensagem: err.message });
  }
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const produto = await produtoService.buscarPorId(id);
    res.json(produto);
  } catch (err) {
    res.status(err.id).json({ mensagem: err.message });
  }
}

async function atualizar(req, res) {
  const id = req.params.id;
  let produto = req.body;
  try {
    await produtoService.atualizar(id, produto);
    res.status(200).json({ mensagem: "Seu produto foi atualizado" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function deletar(req, res) {
  const id = req.params.id;
  try {
    await produtoService.deletar(id);
    res.status(200).json({ mensagem: "Seu produto foi deletado" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}


async function atualizarPreco(req, res) {
  const id = req.params.id;
  const novoPreco = req.body.preco; 
  try {
    await produtoService.atualizarPreco(id, novoPreco);
    res.status(200).json({ mensagem: "Preço do produto atualizado" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

async function produtoIndisponivel(req, res) {
  const id = req.params.id;
  try {
    await produtoService.produtoIndisponivel(id);
    res.status(200).json({ mensagem: "Marcado como indisponível com sucesso" });
  } catch (error) {
    res.status(error.id).json({ mensagem: error.message });
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
  atualizarPreco,
  produtoIndisponivel,
};