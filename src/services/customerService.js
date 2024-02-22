const Customer = require("../models/customer")

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

    getCustomerService : async () => {
        try {
            let results = await Customer.find({});  
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
    }

    


}