const bcrypt = require("bcrypt");
const usersServices = require('../services/users.services')
const userModel = require('../Models/users.models');
const Mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const { modelName } = require("../Models/users.models");

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

    async api(req,res) {
      try{
        console.log("controller",req.query._id)
        const userData = await usersServices.findUserById({data: req.query._id})
        console.log("controller 2",userData)
        if(!userData) {
          res.send('User not found with ID').status(404)
        } 
        res.json(userData).status(200)
      } catch (error) {
          console.log('controller error', error)
          res.send(error)
      }
    },

    async updateUser(req, res) {
      try{
        // console.log("update",req.query._id)
        // console.log("update", req.body)
        const userData = await usersServices.findUserById({data: req.query._id})
        // console.log("userData",userData)
        if(!userData) {
          res.send('User not found with ID').status(404)
        } 
        // console.log("print db", Mongoose.Types.ObjectId(req.query._id))
        
        const updateUsers = await usersServices.updateUser({data: req})
        console.log("updated User", updateUsers)
       
        res.send("Update Successful")

      } catch (error) {
          console.log('update error', error)
          res.send("Update Failed", error)
      }
    },

    async deleteUser(req, res){
      try{
        const userData = await usersServices.findUserById({data: req.query._id})
        console.log("userData",userData)
        if(!userData) {
          res.send('User not found with ID').status(404)
        }
        // res.send("hii")

      } catch (error) {
          console.log('controller error', error)
          res.send(error)
      }
    },

    async data(req,res,next){
      // res.sendFile(path.join(__dirname,'data.html'))
      // res.send("welcome, kam chl rha hai... wait kro")
      // var options = {
      //   root: path.join(__dirname)
      // };
      // var fileName = 'data.html';
      // res.sendFile(fileName, options, function (err) {
      //   if (err) {
      //       next(err);
      //   } else {
      //       console.log('Sent:', fileName);
      //       next();
      //   }
      // });
    }
}