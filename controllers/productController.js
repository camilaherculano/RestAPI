'use strict';

const productData = require('../data/products');
const fixer = require("fixer-api");
fixer.set({ accessKey: "27c58f180b0300d6cc35e4ccf1251e3b" });

const getProducts = async (req, res, next) => {
    try {
        const products = await productData.getProducts();
        res.send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const isValidCurrency = (currency) => {
    if (currency == "USD" ||
        currency == "CAD" ||
        currency == "EUR" ||
        currency == "GBP") {
        return true;
    }
    return false;
}
const getCurrencyData = async () => {
    // get rates
    return await fixer.latest();
}

const convert = (requestedCurrency, product, data) => {
    // no need to convert
    if (requestedCurrency == product.currency) return product.price;

    let convertedValue = 0;

    // current product currency -> base
    switch(product.currency) {
        case 'USD':
            convertedValue = product.price / data.rates.USD;
            break;
        case 'CAD':
            convertedValue = product.price / data.rates.CAD;
            break;
        case 'EUR':
            convertedValue = product.price / data.rates.EUR;
            break;
        case 'GBP':
            convertedValue = product.price / data.rates.GBP;
            break;
        default:
            return product.price;
    }

    if (requestedCurrency == data.base) return parseFloat(convertedValue.toFixed(2));

    // base -> requested currency
    switch(requestedCurrency) {
        case 'USD':
            convertedValue = convertedValue * data.rates.USD;
            break;
        case 'CAD':
            convertedValue = convertedValue * data.rates.CAD;
            break;
        case 'EUR':
            convertedValue = convertedValue * data.rates.EUR;
            break;
        case 'GBP':
            convertedValue = convertedValue * data.rates.GBP;
            break;
        default:
            return product.price;
    }

    return parseFloat(convertedValue.toFixed(2));
}

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const requestedCurrency = req.params.currency;
        const oneProduct = await productData.getById(productId);

        if (oneProduct.length) {
            // update views
            oneProduct[0].views = oneProduct[0].views + 1
            await productData.updateProduct(productId, oneProduct[0]);
            
            // convert currency
            if (isValidCurrency(requestedCurrency)) {
                const data = await getCurrencyData();
                oneProduct[0].price = convert(requestedCurrency, oneProduct[0], data);
                oneProduct[0].currency = requestedCurrency;
            }
        }
        res.send(oneProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await productData.createProduct(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        const updated = await productData.updateProduct(productId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deleted = await productData.deleteProduct(productId);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTopViewedProducts = async (req, res, next) => {
    try {
        const amount = req.query.top ? req.query.top : 5;
        const currency = req.query.currency;
        const topProducts = await productData.getTopViewedProducts(amount);
        
        if (isValidCurrency(currency)) {
            const data = await getCurrencyData();
            let topProductsCurrencyUpdated = [];
            const resolved = new Promise((resolve) => {
                topProducts.forEach(async (product) => {
                    product.price = convert(currency, product, data);
                    product.currency = currency;
                    topProductsCurrencyUpdated.push(product);
                    if (topProductsCurrencyUpdated.length === topProducts.length) resolve();
                });
            });
            
            resolved.then(() => {
                res.send(topProductsCurrencyUpdated);
            });
        } else {
            res.send(topProducts);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getTopViewedProducts
}