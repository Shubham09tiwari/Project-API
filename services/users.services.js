const Mongoose= require('mongoose');
const userModel = require('../Models/users.models')
const usersController = require('../controller/users.controller')

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

    async findUserEmail (email) {
        const useremail = await userModel.findOne(email);
        return useremail
    },

    async updateUserByid(userID, userData) {
        try{

            if(!userID){return "id is required"}
            if(!userData){return "data is required"}
           
            if(userData.data.email){delete userData.data.email}
            if(userData.data.password){delete userData.data.password}
    
            if (userData.data.firstname==""){delete userData.data.firstname}
            if (userData.data.lastname==""){delete userData.data.lastname}
            if (userData.data.contact==""){delete userData.data.contact}
            if (userData.data.address==""){delete userData.data.address}
    
            const updatedUser = userModel.findOneAndUpdate(
                { _id: userID },
                {  $set: userData.data },
                { new: true }
            ).exec();

            return updatedUser;

        }catch(e){
            console.log("it is a fault", e)
        }
    },

    async deleteUserByid(userID) {
        try {
            const deleteUser = userModel.findByIdAndRemove({_id: userID }, (err) => {
                if (!err) {
                    console.log("No Error")
                }
                else {
                    console.log(err)
                }
            });
            return deleteUser;
        } catch(e){
            console.log("it is a fault", e)
        }
    }
}