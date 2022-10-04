const Mongoose= require('mongoose');
const userModel = require('../Models/users.models')

module.exports = {
    async signUpUser (data) {
        const response = await userModel.create(data)
        return response;
    },

    async findUserById (data) {
        try{
            // console.log("services", data)
            // console.log("services2", Mongoose.Types.ObjectId(data.data._id))
          const userData = await userModel.findOne({ _id:Mongoose.Types.ObjectId(data.data) }); 
        //   console.log("userdata service", userData)   
          return userData;
        } catch(e){
            console.log("it is a fault", e)
        }
    },

    async updateUser (data) {
        try{
            console.log("data", data)
            userId = data.query._id
            userData = data.body
           
            if(data.body.email){ 
                delete data.body.email
                // res.send("you can't update/change email")
            }
            if(data.body.password){ 
                delete data.body.password
                // res.send("you can't update/change password")
            }
    
            if (data.body.firstname==""){
                delete data.body.firstname
            }
            if (data.body.lastname==""){
                delete data.body.lastname
            }
            if (data.body.contact==""){
                delete data.body.contact
            }
            if (data.body.address==""){
                delete data.body.address
            }
    
            const updatedUser = userModel.findOneAndUpdate(
                { _id: userId },
                {  $set: userData },
                { new: true }
            ).exec();
            console.log("updated User services", updatedUser)
            return updatedUser;
        }catch(e){
            console.log("it is a fault", e)
        }
    }
}