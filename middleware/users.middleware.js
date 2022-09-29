const jwt = require('jsonwebtoken');
const usersServices = require('../services/users.services')

async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
          const bearerToken = bearerHeader.split('Bearer ')[1];
          const data = jwt.verify(bearerToken, 'shhhhh');
          // console.log("decodedfoo",data.foo)
          // console.log("this is bearer" , bearerToken)
          console.log("this is data" , data.data._id)
          if(!data) res.send('You are not authorized 1').status(403);
          const userData = await usersServices.findUserById({data: data.data._id})
          // console.log("userData" , userData)
          if(!userData) res.send('You are not authorized 2').status(403);

          next();
        } else {
          res.send("Not logged-in").status(403);
        }
    }
    catch(e) {
     console.log(e)
      res.send('You are not authorized 3').status(403)
    }
}

module.exports = verifyToken;