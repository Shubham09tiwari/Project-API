const Mongoose= require('mongoose');
const userModel = require('../Models/users.models')

module.exports = {
    async signUpUser (data) {
        const response = await userModel.create(data)
        return response;
    },

    async findUserById (data) {
        try{
            console.log("services", data)
            // console.log("services2", Mongoose.Types.ObjectId(data.data._id))
          const userData = await userModel.findOne({ _id:Mongoose.Types.ObjectId(data.data) }); 
          console.log("userdata service", userData)   
          return userData;
        } catch(e){
            console.log("it is a fault", e)
        }
    }
}