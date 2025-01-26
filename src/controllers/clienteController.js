// src/controllers/clienteController.js
const clienteService = require('../services/clienteService');

async function getClientes(request, reply) {
  try {
    const clientes = await clienteService.getAllClientes();
    reply.send(clientes);  // Envia a resposta corretamente
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: 'Erro ao listar clientes' + error});
  }
}

async function getCliente(request, reply) {
  const { id } = request.params;
  try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return reply.status(404).send({ error: 'Cliente não encontrado' });
    }
    reply.send(cliente);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao buscar cliente' });
  }
}

async function postCliente(request, reply) {
  const { nome, email, status } = request.body;
  try {
    const cliente = await clienteService.createCliente({ nome, email, status });
    reply.status(201).send(cliente);
  } catch (error) {
    reply.status(400).send({ error: 'Erro ao criar cliente' });
  }
}

async function putCliente(request, reply) {
  const { id } = request.params;
  const { nome, email, status } = request.body;
  try {
    const cliente = await clienteService.updateCliente(id, { nome, email, status });
    reply.send(cliente);
  } catch (error) {
    reply.status(400).send({ error: 'Erro ao editar cliente' });
  }
}

async function deleteCliente(request, reply) {
  const { id } = request.params;
  try {
    const result = await clienteService.deleteClienteId(id);
    if (result.error) {
      return reply.status(404).send({ error: result.error });
    }
    reply.send({ message: result.message });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir cliente' });
  }
}

module.exports = {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  deleteCliente,
};