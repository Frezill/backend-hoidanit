const Customer = require("../models/customer")
const aqp = require ('api-query-params');

module.exports = {
    createCustomerService : async (customerData) => {
        try {
           let result =  await Customer.create({
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone,
                email: customerData.email,
                description: customerData.description,
                image: customerData.image,
            })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    createArrayCustomerService : async (arr) => {
        try{
            let result = await Customer.insertMany(arr);
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },

    getCustomerService : async (limit, page, name, queryString) => {
        try {
            let results = null;
            if(limit && page){
                let offset = (page - 1) * limit;
                
                const { filter} = aqp(queryString);
                delete filter.page;
                
                console.log(">>>  check filter: ", filter);
                results = await Customer.find(filter).skip(offset).limit(limit).exec();
            }else{
                results = await Customer.find({}); 
            }
            return results;
        } catch(error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },
    updateCustomerService : async (customer) => {
        try {
            let name = customer.name;
            let email = customer.email;
            let address = customer.address;
            let result = await Customer.updateOne({ _id: customer.id }, { name: name, email: email, address: address });
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },
    deleteACustomerService : async (id) => {
        try {
            let result = await Customer.deleteById(id);
            return result;
        } catch (error) {
            console.log("error >>>>>>>>>", error);
            return null;
        }
    },
    deleteArrayCustomerService : async (customerId) => {
       try {
            let result = await Customer.delete({_id: { $in: customerId}});
            return result;
       } catch (error) {
        console.log("error >>>>>>>>>", error);
        return null;
       }
    }
}