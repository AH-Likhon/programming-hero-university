/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('Database connection established');

    server = app.listen(config.port, () => {
      logger.info(`${config.port} is working`);
    });
  } catch (error) {
    logger.error(`${error} is here`);
  }

  process.on('unhandledRejection', error => {
    // logger.log('We are facing unhandle rejection and closing our server....')

    if (server) {
      server.close(() => {
        logger.error(error);
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
