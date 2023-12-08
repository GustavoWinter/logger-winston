const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, colorize } = winston.format;

const logger = winston.createLogger({
  level: `${process.env.LOG_LEVEL}` || 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs.log'
    })
  ],
});


export async function GET() {
  logger.error('DEU ERRO');
  logger.warn('warn');
  logger.info('info');
  logger.verbose('verbose');
  logger.debug('debug');
  logger.silly('silly');

  return Response.json({ success: true });
}