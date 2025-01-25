const ativoService = require('../services/ativoService');

async function getAtivos(request, reply) {
  try {
    const ativos = await ativoService.getAllAtivos();
    reply.send(ativos);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar ativos' });
  }
}

module.exports = {
  getAtivos,
};