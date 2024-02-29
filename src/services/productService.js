const Project = require("../models/project");
const aqp = require ('api-query-params');

module.exports = {
    createProjectService : async (data) => {
        if(data.type === "EMPTY-PROJECT"){
            try{
                let result = await Project.create(data);
                return result;
            }catch(error){
                console.log(">>>> error <<<<", error);
            }
            
        }
        
        if(data.type === "ADD-USERS"){
            let myProject = await Project.findById(data.projectId).exec();
            for(let i = 0; i < data.usersArr.length; i++){
                myProject.usersInfor.push(data.usersArr[i]);
            }
            let newResult = await myProject.save();
            return newResult;
        }
    },
    getProjectService : async (queryString) => {
        const page = queryString.page;
        const { filter, limit, population} = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        results = await Project.find(filter).populate(population).skip(offset).limit(limit).exec();
        return results;
    }
}
