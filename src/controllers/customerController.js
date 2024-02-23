const {uploadSingleFile,} = require("../services/fileService")
const { 
    createCustomerService, 
    createArrayCustomerService, 
    getCustomerService, 
    updateCustomerService, 
    deleteACustomerService, 
    deleteArrayCustomerService } = require("../services/customerService")

const aqp = require ('api-query-params');

module.exports = {
    postCreateCustomer : async (req, res) => {

        let{name, address, phone, email, description} = req.body;
        let imageUrl="";
        
        if (!req.files || Object.keys(req.files).length === 0) {
            // return res.status(400).send('No files were uploaded.');
          }else{
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }
        
        let customerData = {
            name, 
            address, 
            phone,
            email, 
            description, 
            image: imageUrl,
        }
        let User = await  createCustomerService(customerData);

        return res.status(200).json({
            EC: 0,
            data: User,
        });
    },
    postCreateArrayCustomer: async (req, res) => {
        let customer = await createArrayCustomerService(req.body.customers)
        
        if(customer) {
            return res.status(200).json({
                EC: 0,
                data: customer,
            });
        } else {
            return res.status(200).json({
                EC: -1,
                data: customer,
            });
        }        
    },

    getAllCustomer : async (req, res) => {
        
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;

        let result = null;
        if(limit && page){
            result = await getCustomerService(limit, page, name, req.query);
        } else {
            result = await getCustomerService();
        }

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
    },

    putUpdateCustomer : async (req, res) => {
        let result = await updateCustomerService(req.body);
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
    },

    deleteACustomer : async (req, res) => {
        let id = req.body.id;
        let result = await deleteACustomerService(id);
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
    },
    deleteArrayCustomer : async (req, res) => {
        let result = await deleteArrayCustomerService(req.body.customerId);
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