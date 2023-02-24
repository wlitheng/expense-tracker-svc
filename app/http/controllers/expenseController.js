const AddExpense = require('./../../models/addExpense');
const TableStorageClient = require('../../lib/clients/tableStorageClient');

const express = require('express');
const expenseApi = express.Router();

TableStorageClient.init({tableName: 'Expenses'});

function mapRequestToEntity(request){
    let expense = new AddExpense({
        id: request.id,
        date: request.date,
        month: request.month,
        year: request.year,
        title: request.title,
        description: request.description,
        user: request.user,
        category: request.category,
        amount: request.amount
    });

    let entity = expense.convertToEntity();

    return {...entity, ...expense};
};

// GET /expenses/
expenseApi.get('/', async (req, res) => {
    let expense = new AddExpense({
        month: req.query.month,
        year: req.query.year,
        user: req.query.user,
    });

    let entity = expense.convertToEntity(expense);
    let expenses = await TableStorageClient.getEntities(entity);
    res.send(expenses).status(200);
});

// POST /expenses/
expenseApi.post('/', async (req, res) => {
    let entities = req.body.expenses.map(mapRequestToEntity);
    entities.forEach(async entity => {
        await TableStorageClient.addEntity(entity);
    });

    res.send().status(200);
});

module.exports = expenseApi;