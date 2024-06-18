export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  node: {
    env: process.env.NODE_ENV,
  },
  server: {
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
