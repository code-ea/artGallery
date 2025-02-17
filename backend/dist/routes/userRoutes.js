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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, } = req.body;
    const signinPayload = req.body;
    const parsedSigninPayload = types_1.signinBody.safeParse(signinPayload);
    if (!parsedSigninPayload) {
        return res.status(406).json({
            message: "Incorrect Inputs"
        });
    }
    try {
        const loggedUser = yield prisma.user.findFirst({
            where: { email },
        });
        if (!loggedUser) {
            return res.status(404).json({ message: "User not found, check your email" });
        }
        else if (loggedUser && password == loggedUser.password) {
            const loggedUserid = loggedUser.user_id;
            const token = jwt.sign({
                loggedUserid
            }, JWT_SECRET);
            return res.status(200).json({ message: "User found",
                role: loggedUser.role,
                token: token
            });
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
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, } = req.body;
    try {
        const { email, password, firstName, lastName, role } = req.body;
        const signupPayload = req.body;
        const parsedSignupPayload = types_1.signupBody.safeParse(signupPayload);
        if (!parsedSignupPayload) {
            return res.status(406).json({
                message: "Incorrect Inputs"
            });
        }
        const existingUser = yield prisma.user.findFirst({
            where: { email }
        });
        if (existingUser) {
            return res.status(406).json({
                message: "Email already taken"
            });
        }
        const newUser = yield prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName,
                role
            }
        });
        const userId = newUser._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);
        return res.status(200).json({
            message: "User created",
            token: token,
            role: role
        });
    }
    catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        // You can modify this to return only the necessary fields, like id, email, etc.
        return res.status(200).json({
            message: "Users fetched successfully",
            users: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
module.exports = router;
