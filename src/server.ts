/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config';
// import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.info('Database connection established');

    server = app.listen(config.port, () => {
      console.info(`${config.port} is working`);
    });
  } catch (error) {
    console.error(`${error} is here`);
  }

  process.on('unhandledRejection', error => {
    // console.log('We are facing unhandle rejection and closing our server....')

    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.info('SIGTER is recieved');
  if (server) {
    server.close();
  }
});
