const { odata, TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const AddExpense = require("../../models/addExpense");

class TableStorageClient {

     /**
     * @param {Object} options Information about the table.
     * @param {string} options.tableName The name of the table.
     */
    constructor(options = {}) {
        const account = process.env.STORAGEACCOUNT;
        const accountKey = process.env.STORAGEKEY;
        
        const credential = new AzureNamedKeyCredential(account, accountKey);
        this.tableClient = new TableClient(`https://${account}.table.core.windows.net`, options.tableName, credential);
    }

    async addEntity(entity = {}) {
        await this.tableClient.createEntity(entity);
    }

    async getEntity(entity = {}) {
        return await this.tableClient.getEntity(entity.partitionKey, entity.rowKey);
    }

    async getEntities(entity = {}) {
        let results = this.tableClient.listEntities({ 
            queryOptions: { 
                filter: odata`PartitionKey eq ${entity.partitionKey}`, 
            }, 
        });

        let expenses = [];
        for await (const entity of results) {
            expenses.push(new AddExpense({
                id: entity.id,
                date: entity.date,
                month: entity.month,
                year: entity.year,
                title: entity.title,
                description: entity.description,
                user: entity.user,
                category: entity.category,
                amount: entity.amount
            }));
        }

        return expenses;
    }
}

module.exports = TableStorageClient;