const express = require('express');
const AddExpense = require('./models/addExpense');
const TableStorageClient = require('./lib/clients/tableStorageClient');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

let serverInstance;
class Server {
    static start() {
        this.tableStorageClient = new TableStorageClient({tableName: 'Expenses'});
        console.log('HTTP server start.');
        serverInstance = app.listen(3000, () => console.log('Expense tracker service listening on port 3000'));

        // GET /expenses/
        app.get('/expenses', async (req, res) => {
            let expense = new AddExpense({
                month: req.query.month,
                year: req.query.year,
                user: req.query.user,
            });

            let entity = expense.convertToEntity(expense);
            let expenses = await this.tableStorageClient.getEntities(entity);
            res.send(expenses).status(200);
        });

        app.post('/expense', async (req, res) => {
            let expense = new AddExpense({
                id: req.body.id,
                date: req.body.date,
                month: req.body.month,
                year: req.body.year,
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                category: req.body.category,
                amount: req.body.amount
            });

            // store the expenses into storage
            let entity = expense.convertToEntity();
            await this.tableStorageClient.addEntity({...entity, ...expense});

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
