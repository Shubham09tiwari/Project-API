const express = require('express')
const app = express()
const port = 4000
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true, limit: "5mb"}));

const { connect, set } = require ('mongoose');
const dbConnection = require('./database/index')
const router = require('./routes/users.routes')

connect(dbConnection.url)

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})