export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  node: {
    env: process.env.NODE_ENV,
  },
  server: {
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expires: process.env.JWT_ACCESS_EXPIRES,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expires: process.env.JWT_REFRESH_EXPIRES,
    },
  },
  firebase: {
    app: {
      key: process.env.FIREBASE_APP_KEY,
    },
    api: {
      key: process.env.FIREBASE_API_KEY,
    },
    auth: {
      domain: process.env.FIREBASE_AUTH_DOMAIN,
      url: process.env.FIREBASE_AUTH_URL,
      cert: process.env.FIREBASE_PROVIDER_X509_CERT_URL,
    },
    storage: {
      bucket: process.env.FIREBASE_STORAGE_BUCKET,
    },
    project: {
      type: process.env.FIREBASE_PROJECT_TYPE,
      id: process.env.FIREBASE_PROJECT_ID,
    },
    private_key: {
      _: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      id: process.env.FIREBASE_PRIVATE_KEY_ID,
    },
    client: {
      id: process.env.FIREBASE_CLIENT_ID,
      email: process.env.FIREBASE_CLIENT_EMAIL,
      cert: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    },
    token: {
      url: process.env.FIREBASE_TOKEN_URL,
    },
    messaging_sender: {
      id: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  },
});
