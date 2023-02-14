const AddExpense = require('./../../models/addExpense');
const TableStorageClient = require('../../lib/clients/tableStorageClient');

const express = require('express');
const expenseApi = express.Router();

TableStorageClient.init({tableName: 'Expenses'});

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

expenseApi.post('/', async (req, res) => {
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
    await TableStorageClient.addEntity({...entity, ...expense});

    res.send(expense).status(200);
});

module.exports = expenseApi;