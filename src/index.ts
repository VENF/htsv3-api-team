import { config } from 'dotenv';
config();
import { Server } from './server';
import './db';
function main() {
  const app = new Server(4000);
  app.listen();
}
main();
