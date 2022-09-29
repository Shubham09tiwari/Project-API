const Mongoose= require('mongoose');
const userModel = require('../Models/users.models')

module.exports = {
    async signUpUser (data) {
        const response = await userModel.create(data)
        return response;
    },

    async findUserById (data) {
        console.log("services", data)
        console.log("services2", Mongoose.Types.ObjectId(data.data._id))
      const userData = await userModel.findOne({ _id:Mongoose.Types.ObjectId(data.data) });
    //   console.log("type", typeof userData)
    const myJSON = JSON.stringify(userData);
    
      return myJSON;
    }
}