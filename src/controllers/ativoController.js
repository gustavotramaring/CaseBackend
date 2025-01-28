const { ativo } = require('../../prismaClient');
const ativoService = require('../services/ativoService');

async function getAtivos(request, reply) {
  try {
    const ativos = await ativoService.getAllAtivos();
    reply.send(ativos);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar ativos' });
  }
}

async function getAtivo(request, reply) {
  const { id } = request.params;
  try {
    const ativo = await ativoService.getAtivoById(id);
    if (!ativo) {
      return reply.status(404).send({ error: 'Ativo não encontrado' });
    }
    reply.send(ativo);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao buscar ativo' });
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

async function deleteAtivos(request, reply) {
  const { id } = request.params;
  try {
    const result = await ativoService.deleteAtivoId(id);
   if (result.error) {
    return reply.status(404).send({ error: result.error });
    }
    reply.send({ message: result.message });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir ativo' });
  }
}

module.exports = {
  getAtivos,
  getAtivo,
  postAtivos,
  deleteAtivos,
};