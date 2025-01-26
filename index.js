const Fastify = require('fastify');
const clienteRoutes = require('./src/routes/clienteRoutes');
const ativoRoutes = require('./src/routes/ativoRoutes');
const prisma = require('./prismaClient');

const app = Fastify();

// Registro do plugin CORS
app.register(require('@fastify/cors'), {
  origin: '*',
});

// Registro das rotas
app.register(clienteRoutes);
app.register(ativoRoutes);

async function start() {
  try {
    await app.listen({
      port: 3000,
      host: '0.0.0.0',
    });
    console.log('Backend rodando na porta 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();