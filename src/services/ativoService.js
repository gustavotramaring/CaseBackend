// src/services/ativoService.js
const prisma = require('../../prismaClient'); // Importando o prisma corretamente

async function getAllAtivos() {
  return [
    { nome: 'Ação XYZ', valor: 123.45 },
    { nome: 'Fundo ABC', valor: 678.90 },
  ];
}

module.exports = {
  getAllAtivos,
};