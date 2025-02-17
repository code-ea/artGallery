import express from "express";
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes")
//const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
//router.use("/account", accountRouter);

module.exports = router;