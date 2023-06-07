import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    logger.info('Database connection established')

    app.listen(config.port, () => {
      logger.info(`${config.port} is working`)
    })
  } catch (error) {
    errorLogger.error(`${error} is here`)
  }
}

main()
