const Project = require("../models/project");
const Task = require("../models/task");
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

        if(data.type === "REMOVE-USERS"){
            let myProject = await Project.findById(data.projectId).exec();
            for(let i = 0; i< data.usersArr.length; i++){
                myProject.usersInfor.pull(data.usersArr[i]);
            }
            let newResult = await myProject.save();
            return newResult;
        }

        if(data.type === "ADD-TASKS"){
            let myProject = await Project.findById(data.projectId).exec();
            for(let i = 0; i < data.taskArr.length; i++){
                myProject.tasks.push(data.taskArr[i]);
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
    },
    updateProjectService : async (data) => {
        try {
            let name = data.name;
            let endDate = data.endDate;
            let description = data.description;
            let result = await Project.updateOne({ _id: data.id }, { name, endDate, description});
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },
    deleteProjectService : async (id) => {
        try {
            let result = await Project.deleteById(id);
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },


    createTaskService : async (data) => {
        if(data.type === "EMPTY-TASK"){
            try{
                let result = await Task.create(data);
                // console.log(">>> result", result);
                return result;
            }catch(error){
                console.log(">>> error at create task: ", error);
            }
        }
    },
    getTaskService : async (queryString) => {
        const page = queryString.page;
        const { filter, limit, population} = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        results = await Task.find(filter).populate(population).skip(offset).limit(limit).exec();
        return results;
    },
    updateTaskService : async (data) => {
        try{
            let result = await Task.updateOne({_id: data.id}, {...data});
            return result;
        }catch(error){
            console.log(">>>error:", error);
            return null;
        }
    },
    deleteTaskService : async (id) => {
        try {
            let result = await Task.deleteById(id);
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    }
}
