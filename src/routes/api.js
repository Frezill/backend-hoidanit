const express = require('express');

const routerAPI = express.Router();

const { getUsersAPI, postCreateUsersAPI, putUpdateUsersAPI, deleteUsersAPI, postUploadSingleFileApi, postUploadMultipleFilesAPI } = require('../controllers/apiController')
const {postCreateCustomer, postCreateArrayCustomer, getAllCustomer,putUpdateCustomer, deleteACustomer, deleteArrayCustomer } = require("../controllers/customerController");
const {postCreateProject, getProject, updateProject, deleteProject } = require("../controllers/projectController");
const {postCreateTask, getTask, putUpdateTask, deleteTask} = require("../controllers/taskController");

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
routerAPI.delete('/customers-many', deleteArrayCustomer);

routerAPI.get('/info', (req, res) => {
    console.log(">>> check querry: ", req.query);
    return res.status(200).json({
        data: req.query,
    })
});
routerAPI.get('/info/:name/:address', (req, res) => {
    console.log(">>> check params: ", req.params);
    return res.status(200).json({
        data: req.params,
    })
});

routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getProject);
routerAPI.put('/projects', updateProject);
routerAPI.delete('/projects', deleteProject);

routerAPI.post('/tasks', postCreateTask);
routerAPI.get('/tasks', getTask);
routerAPI.put('/tasks', putUpdateTask);
routerAPI.delete('/tasks', deleteTask);

module.exports = routerAPI;