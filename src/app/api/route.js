const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, errors } = winston.format;

const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const logtail = new Logtail("gEJaZSpVpXhhr88Dbq6dGpYs");

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   defaultMeta: {
//     service: "admin-service",
//     kntx: "charlotte",
//   },
//   format: combine(errors({ stack: true }), timestamp(), json()),
//   transports: [new winston.transports.Console(), new LogtailTransport(logtail)],
//   exceptionHandlers: [
//     new winston.transports.Console(),
//     new LogtailTransport(logtail),
//   ],
//   rejectionHandlers: [
//     new winston.transports.Console(),
//     new LogtailTransport(logtail),
//   ],
//   exitOnError: false,
// });

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "combined.log",
    }),
    new winston.transports.File({
      filename: "app-error.log",
      level: "error",
    }),
  ],
});

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

// const infoFilter = winston.format((info, opts) => {
//   return info.level === "info" ? info : false;
// });

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   format: combine(timestamp(), json()),
//   transports: [
//     new winston.transports.File({
//       filename: "combined.log",
//     }),
//     new winston.transports.File({
//       filename: "app-error.log",
//       level: "error",
//       format: combine(errorFilter(), timestamp(), json()),
//     }),
//     new winston.transports.File({
//       filename: "app-info.log",
//       level: "info",
//       format: combine(infoFilter(), timestamp(), json()),
//     }),
//   ],
// });

// const fileRotateTransport = new winston.transports.DailyRotateFile({
//   filename: "combined-%DATE%.log",
//   datePattern: "YYYY-MM-DD",
//   maxFiles: "14d",
// });

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   format: combine(timestamp(), json()),
//   transports: [fileRotateTransport],
// });

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   format: winston.format.cli(),
//   transports: [new winston.transports.Console(), new winston.transports.Console(), new LogtailTransport(logtail)],
// });

const childLogger = logger.child({
  subscriberId: "f9ed4675f1c53513c61a3b3b4e25b4c0",
});

export async function GET() {
  childLogger.info("info");
  childLogger.info("another info", {
    rave: "kntx",
    up: "universo parallelo",
  });

  // childLogger.info(new Error("info with new error"), {
  //   rave: "kntx",
  //   up: "universo parallelo",
  // });

  // throw new Error("An uncaught error");
  return Response.json({ success: true });
}
