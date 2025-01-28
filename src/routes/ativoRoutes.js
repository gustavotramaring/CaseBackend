const ativoController = require('../controllers/ativoController');

async function ativoRoutes(fastify) {
  fastify.get('/ativos', ativoController.getAtivos);
  fastify.get('/ativos/:id', ativoController.getAtivo);
  fastify.post('/ativos', ativoController.postAtivos);
  fastify.delete('/ativos/:id', ativoController.deleteAtivos);
}

module.exports = ativoRoutes;