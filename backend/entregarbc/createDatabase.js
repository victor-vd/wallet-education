/*require('dotenv').config();
const { Client } = require('pg');

// Configurações para se conectar ao PostgreSQL com um superusuário
const adminClient = new Client({
  user: 'postgres',          // Nome do superusuário
  password: 'Edileuza100',     // Senha do superusuário
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

async function createDatabase() {
  try {
    await adminClient.connect();
    console.log("Conectado ao PostgreSQL como superusuário.");

    // Cria o banco de dados, se ainda não existir
    await adminClient.query(`
      DO
      $do$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}') THEN
          CREATE DATABASE ${process.env.DB_NAME};
          RAISE NOTICE 'Banco de dados ${process.env.DB_NAME} criado.';
        ELSE
          RAISE NOTICE 'Banco de dados ${process.env.DB_NAME} já existe.';
        END IF;
      END
      $do$;
    `);

    // Cria o usuário do banco, se ainda não existir
    await adminClient.query(`
      DO
      $do$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${process.env.DB_USER}') THEN
          CREATE ROLE ${process.env.DB_USER} WITH LOGIN PASSWORD '${process.env.DB_PASS}';
          RAISE NOTICE 'Usuário ${process.env.DB_USER} criado.';
        ELSE
          RAISE NOTICE 'Usuário ${process.env.DB_USER} já existe.';
        END IF;
      END
      $do$;
    `);

    // Concede todos os privilégios do banco de dados ao usuário
    await adminClient.query(`
      GRANT ALL PRIVILEGES ON DATABASE ${process.env.DB_NAME} TO ${process.env.DB_USER};
    `);

    console.log('Banco de dados \'' + process.env.DB_NAME + '\' e usuário \'' + process.env.DB_USER + '\' verificados/criados com sucesso.');
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
    await adminClient.end();
    console.log("Conexão encerrada.");
  }
}

createDatabase();
*/