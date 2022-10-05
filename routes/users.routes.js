const express = require("express");
const router = express.Router();
const userReq = require("../controller/users.controller")
const verifyToken = require('../middleware/users.middleware')

router.get("/", userReq.homepage);

router.post("/signup", userReq.signUp);

router.post("/login", userReq.login);

router.get("/api", verifyToken, userReq.api);

router.post("/updateUser", verifyToken, userReq.updateUser);

router.delete("/deleteUser", verifyToken, userReq.deleteUser);

router.get("/data", userReq.data);

module.exports = router;