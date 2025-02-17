"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
// router.post("/signin", async (req:any, res:any) => {
//     const { email, password,} = req.body;
//     try {
//       const user = await prisma.user.findFirst({
//         where: { email },
//       });
//       if (!user) {
//         return res.status(404).json({ message: "User not found, check your email" });
//       }
//       else if(user && password == user.password){
//           return res.status(200).json({ message: "User found", role: user.role });
//       }
//       else{
//           return res.status(404).json({
//               message: "Wrong Credentials",
//           });
//       }
//     } catch (error) {
//       console.error("Error finding user:", error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
module.exports = router;
