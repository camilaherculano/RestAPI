'use strict';

const { join } = require('path');

const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), 'data', folderName);
    const fs = require('fs-extra');
    const files = await fs.readdir(filePath);
    const sqlFiles = await files.filter(f => f.endsWith('.sql'));
    const queries = {};

    for (const sqlFile of sqlFiles) {
        const query = await fs.readFileSync(join(filePath, sqlFile), {encoding: "UTF-8"});
        queries[sqlFile.replace(".sql", "")] = query
    }

    return queries;
}

module.exports = {
    loadSqlQueries
}