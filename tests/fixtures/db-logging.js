const {MongoClient, ObjectID } = require('mongodb'); 

const connectionURL = process.env.MONGODB_URL;
const databaseName = 'logger-test';

let collectionSuffix = new Date().getUTCMonth() +'-' + new Date().getUTCFullYear();

const mongoLoggerCollection = `logger-logs-${ collectionSuffix}`;


const getSingleLogMessage = async (logLevel) => 
{
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => 
    {
        if(error)
        {
            //console.log(`Unable to connect to datavase : ${error}` );
            return;
        }

        const db = client.db(databaseName);

        db.collection(mongoLoggerCollection).findOne({level: logLevel}, (error, logMessage) =>
        {
                if(error)
                {
                  // console.log(`Unable to fetch log message. Error : ${error}`);
                  return;
                }
                console.log(`The log that has been written to DB is ${logMessage}`);
                return logMessage;
        });


    });
};

const setupDatabase = async () => 
{
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => 
    {
        if(error)
        {
              // console.log(`Unable to connect to datavase : ${error}` );
              return;
        }

        const db = client.db(databaseName);

        db.collection(mongoLoggerCollection).deleteMany().then( (result) =>
            {
                //console.log(`Success : deleted : ${result.deletedCount}` );
                return ;

            }).catch( (error) =>
            {
                //console.log(`Error : ${error}`);
                return;

            })

    });
    
}

module.exports = {
    setupDatabase,
    getSingleLogMessage
}