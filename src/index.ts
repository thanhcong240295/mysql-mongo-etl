import 'module-alias/register';

import app from '@/app';
import config from '@/config';
import { MongooseConnection, MySQLConnection, logger } from '@/utils';

let server: any;
MongooseConnection.getConnection()
  .then(() => {
    MySQLConnection.getConnection()
      .then(() => {
        server = app.listen(config.port, () => {
          logger.info(`Listening to port ${config.port as number}`);
        });
      })
      .catch(() => logger.error('Server error!'));
  })
  .catch(() => logger.error('Server error!'));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

process.setMaxListeners(0);
