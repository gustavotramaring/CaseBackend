const clienteController = require('../controllers/clienteController');

async function clienteRoutes(fastify) {
  fastify.get('/clientes', clienteController.getClientes);
  fastify.post('/clientes', clienteController.postCliente);
  fastify.put('/clientes/:id', clienteController.putCliente);
  fastify.delete('/clientes/:id', clienteController.deleteCliente);
}

module.exports = clienteRoutes;