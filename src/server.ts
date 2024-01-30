process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';

import validateEnv from './utils/validateEnv';
import { AuthController } from '@controllers/auth.controller';
import { CustomerController } from './controllers/customer.controller';
import { CommentsController } from './controllers/comments.controller';


validateEnv();

const app = new App([
  AuthController,
  CustomerController,
  CommentsController
  
]);
app.listen();
