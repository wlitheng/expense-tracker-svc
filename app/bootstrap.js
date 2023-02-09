const applicationServer = require('./server');

applicationServer.start();

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received, closing server');
    applicationServer.stop();
});