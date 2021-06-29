'use strict';

const sql = require('mssql');
const utils = require('../utils');
const config = require('../../config');

const getProducts = async () => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const list = await pool.request().query(sqlQueries.productsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

const getById = async (productId) => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const oneProduct = await pool.request()
                            .input('productId', sql.Int, productId)
                            .query(sqlQueries.productById);
        return oneProduct.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

const createProduct = async (productData) => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const insertProduct = await pool.request()
                            .input('name', sql.NVarChar(100), productData.name)
                            .input('description', sql.NVarChar(1500), productData.description)
                            .input('price', sql.Decimal(19,2), productData.price)
                            .input('currency', sql.NVarChar(3), productData.currency)
                            .input('views', sql.Int, productData.views)
                            .input('deleted', sql.Bit, productData.deleted)
                            .query(sqlQueries.createProduct);
        return insertProduct.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

const updateProduct = async (productId, productData) => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const update = await pool.request()
                            .input('productId', sql.Int, productId)
                            .input('name', sql.NVarChar(100), productData.name)
                            .input('description', sql.NVarChar(1500), productData.description)
                            .input('price', sql.Decimal(19,2), productData.price)
                            .input('currency', sql.NVarChar(3), productData.currency)
                            .input('views', sql.Int, productData.views)
                            .input('deleted', sql.Bit, productData.deleted)
                            .query(sqlQueries.updateProduct);
        return update.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

const deleteProduct = async (productId) => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const deleted = await pool.request()
                            .input('productId', sql.Int, productId)
                            .input('deleted', sql.Bit, true)
                            .query(sqlQueries.deleteProduct);
        return deleted.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

const getTopViewedProducts = async (amount) => {
    let pool;
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('products');
        const topProducts = await pool.request()
                            .input('amount', sql.Int, amount)
                            .query(sqlQueries.topViewedProducts);
        return topProducts.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}

module.exports = {
    getProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
    getTopViewedProducts
}