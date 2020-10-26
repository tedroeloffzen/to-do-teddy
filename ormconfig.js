module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'todo',
  password: 'todo',
  database: 'todo',
  synchronize: false,
  // logging: ['error', 'query'],
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"]
};
