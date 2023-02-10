const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

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
        this.tableClient.createEntity(entity)
    }
}

module.exports = TableStorageClient;