const express = require("express");
const router = express.Router();
const userReq = require("../controller/users.controller")
const verifyToken = require('../middleware/users.middleware')

router.get("/", userReq.homepage);

router.post("/signup", userReq.signUp);

router.post("/login", userReq.login);

router.get("/api",verifyToken, userReq.api);

module.exports = router;