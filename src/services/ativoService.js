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

async function getAtivoById(id) {
  try {
    return await prisma.ativo.findUnique({
      where: { id: parseInt(id) },
      include: {
        cliente: true,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar ativo do cliente:", error)
    throw new Error('Erro ao buscar ativo do cliente')
  }
}

async function createAtivo({ nome, valor, rentabilidade, clienteId }) {
  const data = { nome, valor, rentabilidade };
  if (clienteId) {
    data.clienteId = clienteId; // Adiciona `clienteId` somente se ele for fornecido
  }

  return prisma.ativo.create({
    data,
  });
}

async function deleteAtivoId(id) {
  try {
    const ativo = await prisma.ativo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!ativo) {
      return { error: 'Ativo não encontrado.' };
    }

    await prisma.ativo.delete({
      where: { id: parseInt(id) },
    });

    return { message: 'Ativo excluído com sucesso.' };
  } catch (error) {
    console.error('Erro ao excluir ativo:', error);
    return { error: 'Erro ao excluir ativo.' };
  }
}

module.exports = {
  getAllAtivos,
  getAtivoById,
  createAtivo,
  deleteAtivoId,
};