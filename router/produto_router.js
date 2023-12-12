// produto_router.js
const express = require("express");
const router = express.Router();
const produtoController = require("../controller/produto_controller");

router.get("/atualizarPreco/:id", produtoController.atualizarPreco);
router.get("/produtoIndisponivel/:id", produtoController.produtoIndisponivel);

router.get("/", produtoController.listar);
router.post("/", produtoController.inserir);
router.get("/:id", produtoController.buscarPorId);
router.put("/:id", produtoController.atualizar);
router.delete("/:id", produtoController.deletar);

module.exports = router;
