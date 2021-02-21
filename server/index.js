'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {
  getProducts,
  getSomeProducts,
  getProductInfo,
  getCategory,
  getCompanies,
  addSearchArray,
  getSearchArray,
  getFilterResults,
} = require('./handlers');

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  .get('/api/products', getProducts) // Returns ALL item info
  .get('/api/someproducts', getSomeProducts) //Returns the first 8 items
  .get('/api/category/:categoryId', getCategory)
  .get('/api/product-details/:id', getProductInfo)
  .get('/api/companies', getCompanies)
  .post('/api/add-search-array', addSearchArray)
  .get('/api/searched/:searchedId', getSearchArray)
  .post('/api/filter', getFilterResults)

  // Catch all endpoint
  .get('*', (req, res) =>
    res.status(404).json({
      status: 404,
      message: 'There is a problem with your request!',
    })
  )

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
