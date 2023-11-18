import express from 'express';
import flash from 'connect-flash';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import session from 'express-session';
const MongoStore = require('connect-mongodb-session')(session);
import { schema } from './graphql/schema';
import varMiddleware from './middleware/variables';
import userMiddleware from './middleware/user';

const {
  MONGO_INITDB_ROOT_USERNAME: username,
  MONGO_INITDB_ROOT_PASSWORD: password,
  MONGO_HOST: host,
} = process.env;

const PORT = process.env.SERVER_PORT || 5050;
const MONGODB_URI = `mongodb://${username}:${password}@${host}/mongodb?authSource=admin`;

const app = express();

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
});

app.use(
  session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

// Подключение к MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

async function startServer() {
  const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}/graphql`);
  });
}
