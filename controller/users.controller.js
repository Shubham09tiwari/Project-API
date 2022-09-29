const bcrypt = require("bcrypt");
const usersServices = require('../services/users.services')
const userModel = require('../Models/users.models');
// user = userModel
const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/users.middleware')

module.exports = {

  async homepage(req, res) {
      res.send('Hello World!')
    },
    
    async signUp(req, res) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      
      const responce2 = await usersServices.signUpUser(req.body);
      // console.log(responce2)
      res.send(responce2).status(201)
    },

    async login(req, res) {

      const body = req.body;
      const user = await userModel.findOne({ email: body.email });
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          let token = jwt.sign({ data: user }, 'shhhhh');

          res.status(200).json({token:token, message: "Valid password" });
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }

    },

    // app.get('/api', verifyToken, (req, res) => {
    async api(req,res) {
      try{
        console.log("controller",req.query._id)
        const userData = await usersServices.findUserById({data: req.query._id})
        console.log("controller 2",userData)
        if(!userData) {
          res.send('User not found with ID').status(404)
        } 
        console.log("controller data", userData)
        res.json(userData).status(200)
      } catch (error) {
          console.log('controller error', error)
          res.send(error)
      }
    }
}