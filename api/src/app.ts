import http from 'http';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql';

const app = express();
const httpServer = http.createServer(app);
const graphqlServer = new ApolloServer({ schema });

const PORT = Number(process.env.PORT) || 5000;

// configure file api

let storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + '.' + extension);
  },
});

const upload = multer({ storage });

app.use('/file', express.static('uploads')); // serving uploaded files to `file/${filename}`

app.post('/file', upload.single('uploaded_file'), (req, res) => {
  let path = `${req.file?.filename}`;
  res.json(path);
});

const startServer = async () => {
  await graphqlServer.start();

  // binding graphql server to `/graphql` path
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  httpServer.listen(PORT);
};

startServer()
  .then(() => {
    console.log(`[🚀] GRAPHQL SERVER AT http://localhost:${PORT}/graphql`);
    console.log(`[📂] FILE API AT http://localhost:${PORT}/file`);
  })
  .catch(console.log);
