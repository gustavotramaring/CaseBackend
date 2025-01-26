// src/services/ativoService.js
const prisma = require('../../prismaClient'); // Importando o prisma corretamente

async function getAllAtivos() {
  try {
    return await prisma.ativo.findMany({
      include: {
        cliente: false,
        clienteId: false
      }
    });
  } catch (error) {
    console.error("Erro ao listar ativos:", error);
    throw new Error("Erro ao listar clientes");
  }
}

async function createAtivo({ nome, valor, clienteId }) {
  const data = { nome, valor };
  if (clienteId) {
    data.clienteId = clienteId; // Adiciona `clienteId` somente se ele for fornecido
  }

  return prisma.ativo.create({
    data,
  });
}

module.exports = {
  getAllAtivos,
  createAtivo,
};