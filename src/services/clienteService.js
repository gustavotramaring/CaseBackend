const prisma = require('../../prismaClient');

async function getAllClientes() {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        ativos: true, // Inclui os ativos do cliente
      },
    });

    // Calculando o valor total dos ativos para cada cliente
    const clientesComTotais = clientes.map(cliente => {
      const totalAtivos = cliente.ativos.reduce((acc, ativo) => acc + ativo.valorAtual, 0);
      
      return {
        ...cliente,
        totalAtivos, // Adiciona o total de ativos ao cliente
      };
    });

    return clientesComTotais;
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw new Error('Erro ao listar clientes');
  }
}

async function getClienteById(id) {
  try {
    return await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        ativos: true, // Inclui os ativos associados ao cliente
      },
    });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw new Error('Erro ao buscar cliente');
  }
}

async function createCliente({ nome, email, status }) {
  try {
    // Verificar se o email já existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (existingCliente) {
      throw new Error('Email já cadastrado a um cliente.');
    }

    // Criar cliente se o email não existir
    const cliente = await prisma.cliente.create({
      data: { 
        nome,
        email, 
        status 
      },
    });

    return cliente;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
}

async function updateCliente(id, data) {
  const { email } = data;

  // Verifica se o email já está em uso por outro cliente
  const emailExistente = await prisma.cliente.findFirst({
    where: {
      email,
      NOT: { id: Number(id) }, // Ignora o cliente que está sendo editado
    },
  });

  if (emailExistente) {
    throw new Error('Email já está em uso');
  }

  return await prisma.cliente.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteClienteId(id) {
  try {
    // Primeiro, buscamos o cliente para garantir que ele existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cliente) {
      return { error: 'Cliente não encontrado.' };
    }

    // Exclui o cliente
    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });

    return { message: 'Cliente excluído com sucesso.' };
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return { error: 'Erro ao excluir cliente.' };
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
  getClienteById,
  createCliente,
  updateCliente,
  deleteClienteId,
};