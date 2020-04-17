const logger = require ('../src/logging/logger');

const { setupDatabase, getSingleLogMessage} = require('./fixtures/db-logging');

beforeEach(setupDatabase);

afterEach( () =>
{
    //console.log('afterEach');
})


test('Should log info message to DB' , async () =>
{
    messageToLog = `This is a test message INFO log message for date ${new Date().getTime()}`;
    logger.info(messageToLog);

    const logMessage =  getSingleLogMessage('info');

     expect(logMessage.message).toBe(messageToLog);

});