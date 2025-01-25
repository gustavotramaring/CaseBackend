const prisma = require('../../prismaClient');

async function getAllClientes() {
  try {
    return await prisma.cliente.findMany();
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw new Error('Erro ao listar clientes'); // Ou retorne um objeto de erro mais específico
  }
}

async function createCliente({ nome, email, status }) {
  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        status,
      },
    });
    return cliente;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    if (error.code === 'P2002') { // Erro de unique constraint
      return { error: 'Email já cadastrado.' }; // Retorna um objeto com erro
    }
    // Outros erros do Prisma (ex: P2003, P2017, etc.)
    return { error: 'Erro ao criar cliente.' };
  }
}

async function updateCliente(id, { nome, email, status }) {
  try {
      return await prisma.cliente.update({
          where: { id: parseInt(id) },
          data: { nome, email, status },
      });
  } catch (error) {
      console.error("Erro ao atualizar cliente:", error)
      return { error: "Erro ao atualizar cliente" }
  }
}

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  } finally {
      await prisma.$disconnect()
  }
}

testConnection();

module.exports = {
  getAllClientes,
  createCliente,
  updateCliente,
};