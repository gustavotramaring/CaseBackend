const ativoController = require('../controllers/ativoController');

async function ativoRoutes(fastify) {
  fastify.get('/ativos', ativoController.getAtivos);
}

module.exports = ativoRoutes;