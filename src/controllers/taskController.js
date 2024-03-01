const {createTaskService, getTaskService, updateTaskService, deleteTaskService} = require("../services/productService");
const Joi = require('joi');

module.exports = {
    postCreateTask : async (req, res) => { 

        const schema = Joi.object({
            type: Joi.string(),
            name: Joi.string().required(),
            description: Joi.string(),
            status: Joi.string().required(),
            startDate: Joi.date().iso().required(),
            endDate: Joi.date().iso().required()
        })
        let {error} =schema.validate(req.body, {abortEarly: false});
        if(error){
            return res.status(200).json({
                msg: error
            });
        }else{
            try{
                let result = await createTaskService(req.body);
                // console.log(">>>result: ", result);
                return res.status(200).json({
                    EC: 0,
                    data: result,
                });
            }catch(error){
                console.log(">>> error <<<", error);
            }
        }
    },
    getTask : async (req, res) => {
        try{
            let result = await getTaskService(req.query);
            // console.log(">>>result: ", result);
            return res.status(200).json({
                EC: 0,
                data: result,
            });
        }catch(error){
            console.log(">>> error <<<", error);
        }
    },
    putUpdateTask : async (req, res) => {
        try{
            let result = await updateTaskService(req.body);
            // console.log(">>>result: ", result);
            return res.status(200).json({
                EC: 0,
                data: result,
            });
        }catch(error){
            console.log(">>> error <<<", error);
        }
    },
    deleteTask : async (req, res) => {
        try{
            let result = await deleteTaskService(req.body.id);
            return res.status(200).json({
                EC: 0,
                data: result,
            });
        }catch(error){
            console.log(">>> error <<<", error);
        }
        
    }
}