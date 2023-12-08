const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, colorize } = winston.format;

const logger = winston.createLogger({
  level: `${process.env.LOG_LEVEL}` || 'info',
  format: combine(
  colorize({all:true}),
  timestamp({
    format: 'DD-MM-YYYY hh:mm:ss.SSS A',
  }), json()),
  transports: [
    new winston.transports.Console(),
  ],
});

logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');

export async function GET() {
  logger.info("DEU INFO AQUI EM");

  return Response.json({ success: true });
}