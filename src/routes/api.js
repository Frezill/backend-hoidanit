const express = require('express');

const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadSingleFileApi, postUploadMultipleFilesAPI } = require('../controllers/apiController')

//declare route

routerAPI.get('/users', getUsersAPI);

routerAPI.post('/users', postCreateUsersAPI);

routerAPI.put('/users', putUpdateUsersAPI);

routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', postUploadSingleFileApi);
routerAPI.post('/files', postUploadMultipleFilesAPI);
module.exports = routerAPI;