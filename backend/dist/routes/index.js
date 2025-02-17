"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");
//const accountRouter = require("./account");
const router = express_1.default.Router();
router.use("/user", userRouter);
router.use("/admin", adminRouter);
//router.use("/account", accountRouter);
module.exports = router;
