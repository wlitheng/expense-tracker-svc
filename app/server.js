const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

let serverInstance;
class Server {
    static start() {
        console.log('HTTP server start.');
        serverInstance = app.listen(3000, () => console.log('Expense tracker service listening on port 3000'));

        app.use('/expenses', require('./http/controllers/expenseController'));
        app.use('/health', require('./http/controllers/healthController'));
    }

    static stop() {
        serverInstance.close(() => {
            console.log('HTTP server close.')
        });
    }
}

module.exports = Server;
