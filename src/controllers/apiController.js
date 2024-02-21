const User = require('../models/user')

const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");


const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results,
    })
}

const postCreateUsersAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let user = await User.create({
        email: email,
        name: name,
        city: city,
    })

    return res.status(200).json({
        errorCode: 0,
        data: user,
    })
}

const putUpdateUsersAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;

    let user = await User.updateOne({ _id: userId }, { name: name, email: email, city: city });
    return res.status(200).json({
        errorCode: 0,
        data: user,
    })
}

const deleteUsersAPI = async (req, res) => {
    let userId = req.body.userId;
    let user = await User.deleteOne({ _id: userId });
    return res.status(200).json({
        errorCode: 0,
        data: user,
    })
}

const postUploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
    let result = await uploadSingleFile(req.files.image)
    console.log(">>>> check result: ", result);
    return res.send("ok single")
}

const postUploadMultipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // console.log(req.files);
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } else {
        //upload single
        return await postUploadSingleFileApi(req, res);
    }
}


module.exports = {
    getUsersAPI,
    postCreateUsersAPI,
    putUpdateUsersAPI,
    deleteUsersAPI,
    postUploadSingleFileApi,
    postUploadMultipleFilesAPI,
}