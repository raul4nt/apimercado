const express = require("express");
const router = express.Router();
const clienteController = require('../controller/cliente_controller');

router.get('/', clienteController.listarClientes);
router.post('/', clienteController.inserirCliente);
router.get('/:id', clienteController.buscarClientePorId);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);
router.get("/infoCliente/:clienteId", clienteController.infoCliente);

module.exports = router;
