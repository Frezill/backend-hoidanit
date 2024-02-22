const express = require('express');

const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadSingleFileApi, postUploadMultipleFilesAPI } = require('../controllers/apiController')
const {postCreateCustomer, postCreateArrayCustomer, getAllCustomer,putUpdateCustomer, deleteACustomer } = require("../controllers/customerController");


//declare route

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUsersAPI);
routerAPI.put('/users', putUpdateUsersAPI);
routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', postUploadSingleFileApi);
routerAPI.post('/files', postUploadMultipleFilesAPI);

routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/getCustomers', getAllCustomer);
routerAPI.put('/updateCustomer', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
module.exports = routerAPI;