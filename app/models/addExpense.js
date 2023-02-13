class AddExpense {
    constructor(expense) {
        this.id = expense.id;
        this.date = expense.date;
        this.month = expense.month;
        this.year = expense.year;
        this.title = expense.title;
        this.description = expense.description;
        this.user = expense.user;
        this.category = expense.category;
        this.amount = expense.amount;
    }

    /**
     * Convert this model to entity.
     */
    convertToEntity() {
        return {
            partitionKey: `${this.user}_${this.year}_${this.month}`,
            rowKey: `${this.id}`
        };
    }
}

module.exports = AddExpense;