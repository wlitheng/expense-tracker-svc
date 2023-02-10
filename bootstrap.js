const applicationServer = require('./app/server');

process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// only load the .env file in development environment
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

applicationServer.start();

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received, closing server');
    applicationServer.stop();
});