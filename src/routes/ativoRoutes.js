const ativoController = require('../controllers/ativoController');

async function ativoRoutes(fastify) {
  fastify.get('/ativos', ativoController.getAtivos);
  fastify.post('/ativos', ativoController.postAtivos);
}

module.exports = ativoRoutes;