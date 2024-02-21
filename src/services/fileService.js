const path = require('path');

const uploadSingleFile = async (fileOpject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let extName = path.extname(fileOpject.name);
    let baseName = path.basename(fileOpject.name, extName);
    let finalName = `${baseName}-${Date.now()}$extName`;
    let finalPath = `${uploadPath}/${finalName}`;


    // Use the mv() method to place the file somewhere on your server
    try{
        await fileOpject.mv(finalPath);
        return {
            status: 'success',
            path: 'link-image',
            error: null,
          }
    } catch (error){
        console.log(">>>>> check error: ", error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err),
        }
    }
}

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");

        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            // console.log("check i = ", i)
            //get image extension
            let extName = path.extname(filesArr[i].name);

            //get image's name (without extension)
            let baseName = path.basename(filesArr[i].name, extName);

            //create final path: eg: /upload/your-image.png
            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles,
}