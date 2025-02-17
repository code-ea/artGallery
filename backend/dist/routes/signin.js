"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        const user = yield prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found, check your email" });
        }
        else if (user && password == user.password) {
            console.log(user.password);
            return res.status(200).json({ message: "User found" });
        }
        else {
            return res.status(404).json({
                message: "Wrong Credentials",
            });
        }
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
// ✅ CommonJS Export
module.exports = router;
