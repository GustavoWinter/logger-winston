const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, colorize } = winston.format;

export const logger = winston.createLogger({
  level: `${process.env.LOG_LEVEL}` || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console()
  ],
});
logger.error('DEU ERRO');


export async function GET() {
  logger.error('DEU ERRO');
  logger.warn('warn');
  logger.info('info');
  logger.verbose('verbose');
  logger.debug('debug');
  logger.silly('silly');

  return Response.json({ success: true });
}