const ativoService = require('../services/ativoService');

async function getAtivos(request, reply) {
  try {
    const ativos = await ativoService.getAllAtivos();
    reply.send(ativos);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar ativos' });
  }
}

async function postAtivos(request, reply) {
  const { nome, valor, clienteId } = request.body;
  try {
    const ativo = await ativoService.createAtivo({
      nome,
      valor,
      clienteId: clienteId || null, // Passa `null` se o clienteId não for fornecido
    });
    reply.status(201).send(ativo);
  } catch (error) {
    console.error("Erro ao criar ativo:", error);
    reply.status(400).send({ error: 'Erro ao criar ativo' });
  }
}

module.exports = {
  getAtivos,
  postAtivos,
};