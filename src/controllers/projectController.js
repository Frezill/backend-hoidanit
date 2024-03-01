const {createProjectService, getProjectService, updateProjectService, deleteProjectService } = require("../services/productService");
const Joi = require('joi');

module.exports = {
    postCreateProject : async (req, res) => {
        if(req.body.type === "EMTY-PROJECT"){
            const schema = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                startDate: Joi.string().required(),
                endDate: Joi.string(),
                description: Joi.string(),
                type: Joi.string(),
                customerInfor: Joi.object(),
                leader: Joi.object()
            })
            var {error} =schema.validate(req.body, {abortEarly: false});
        }else if(req.body.type === "ADD-TASKS" ){
            const schema = Joi.object({
                type: Joi.string(),
                projectId: Joi.string(),
                taskArr: Joi.array()
            })
            var {error} =schema.validate(req.body, {abortEarly: false});
        }else if(req.body.type === "ADD-USERS" || req.body.type === "REMOVE-USERS"){
            const schema = Joi.object({
                type: Joi.string(),
                projectId: Joi.string(),
                userArr: Joi.array()
            })
            var {error} =schema.validate(req.body, {abortEarly: false});
        }
        
        if(error){
            return res.status(200).json({
                msg: error
            });
        } else{
            try{
                let result = await createProjectService(req.body);
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
    getProject : async (req, res) => {
        let result = await getProjectService(req.query);
            // console.log(">>>result: ", result);
            return res.status(200).json({
                EC: 0,
                data: result,
            });
    },

    updateProject : async (req, res) => {
        let result = await updateProjectService(req.body);
        // console.log(">>>result: ", result);
        return res.status(200).json({
            EC: 0,
            data: result,
        });
    },

    deleteProject : async (req, res) => {
        let id = req.body.id;
        let result = await deleteProjectService(id);
        if(result) {
            return res.status(200).json({
                EC: 0,
                data: result,
            });
        } else {
            return res.status(200).json({
                EC: -1,
                data: result,
            });
        } 
    }
}