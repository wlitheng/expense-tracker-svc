class AddExpense {
    constructor(expense) {
        this.id = expense.id;
        this.date = expense.date;
        this.title = expense.title;
        this.description = expense.description;
        this.user = expense.user;
        this.category = expense.category;
    }
}

module.exports = AddExpense;