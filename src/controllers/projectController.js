const {createProjectService, getProjectService } = require("../services/productService");

module.exports = {
    postCreateProject : async (req, res) => {
        // res.send("ok project");  
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
    },
    getProject : async (req, res) => {
        let result = await getProjectService(req.query);
            // console.log(">>>result: ", result);
            return res.status(200).json({
                EC: 0,
                data: result,
            });
    }
}