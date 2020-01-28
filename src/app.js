import express from 'express';
import routes from './routes';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { setUpWebSocket } from './websocket';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.mongo();
  }
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/week10', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
  routes() {
    this.server.use(routes);
  }
}

const server = http.Server(new App().server)

setUpWebSocket(server);

export default server;