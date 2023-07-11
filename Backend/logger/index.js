function logger(level) {
  return function (message) {

    if (level == 'error')
      console.error(new Error(`${message}`));
    else
      console.log(`[${level.toUpperCase()}] ${message}`);
  };
}
module.exports = logger;

















// const { format, createLogger, transports } = require('winston');
// const { timestamp, combine, printf } = format;

// const myFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} ${level}: ${stack || message}`;
// });

// const logger = createLogger({
//   format: combine(
//     format.colorize(),
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.errors({ stack: true }),
//     myFormat),
//   // defaultMeta: { service: 'user-service' },
//   transports: [
//     // new transports.Console(),
//     new transports.File({ filename: 'error.log', level: 'error' }),
//     new transports.File({ filename: 'combined.log' })
//   ],
// });

// module.exports = logger;

// logger.info("User "+email+" logged in successfully")
// logger.warn("HELLO MY LOGGER FRND")
// logger.error(new Error("HELLO MY LOGGER FRND"))