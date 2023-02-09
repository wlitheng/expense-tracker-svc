const express = require('express');
const AddExpense = require('./models/addExpense');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

let serverInstance;
class Server {
    static start() {
        console.log('HTTP server start.');
        serverInstance = app.listen(3000, () => console.log('Expense tracker service listening on port 3000'));

        // GET /expenses/
        app.get('/expenses', async (req, res) => {
            res.send('Miao~~~').status(200);
        });

        app.post('/expense', async (req, res) => {
            let expense = new AddExpense({
                id: req.body.id,
                date: req.body.date,
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                category: req.body.category,
            });

            // store the expenses into storage

            res.send(expense).status(200);
        });
    }

    static stop() {
        serverInstance.close(() => {
            console.log('HTTP server close.')
        });
    }
}

module.exports = Server;
