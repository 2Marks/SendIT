import * as http from 'http';
import { get } from './config';
import App from './app';

const server = http.createServer(App);

server.listen(
  get('APP_PORT'),
  () => console.log(`SENDIT API SERVER STARTED SUCCESSFULLY ON PORT ${get('APP_PORT')}`)
);