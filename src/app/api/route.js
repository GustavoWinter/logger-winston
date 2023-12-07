const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, colorize } = winston.format;

// const { Logtail } = require("@logtail/node");
// const { LogtailTransport } = require("@logtail/winston");

// const logtail = new Logtail(`${process.env.SOURCE_TOKEN}`);
console.log('OLA AQUI E O CONSOLE .LOG')

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


export async function GET() {
  logger.error("DEU ERRO AQUI EM");
  logger.info("DEU INFO AQUI EM");

  return Response.json({ success: true });
}