const {createLogger, transports, format} = require('winston');
require('winston-mongodb');

const mongoConnection = process.env.MONGODB_URL;

let collectionSuffix = new Date().getUTCMonth() +'-' + new Date().getUTCFullYear();

const mongoLoggerCollection = `logger-logs-${ collectionSuffix}`;


const logger = createLogger(
    {
        transports : [
            new transports.MongoDB(
                {
                    levels: {error :0 , warn : 1 , info: 3},
                    db: mongoConnection,
                    options : { useUnifiedTopology: true },
                    collection : mongoLoggerCollection,
                    format : format.combine(format.timestamp(), format.json())

                }
            )
        ]
    }
)

module.exports = logger;

