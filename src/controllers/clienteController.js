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

module.exports = {
  getClientes,
  postCliente,
  putCliente,
};