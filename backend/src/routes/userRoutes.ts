import { signinBody, signupBody } from "../types";
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/signin", async (req:any, res:any) => {
  const { email, password,} = req.body;
  const signinPayload = req.body;
  const parsedSigninPayload = signinBody.safeParse(signinPayload);

  if(!parsedSigninPayload){
    return res.status(406).json({
      message: "Incorrect Inputs"
    })
  }

  try {
    const loggedUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found, check your email" });
    }
    else if(loggedUser && password == loggedUser.password){
        const loggedUserid = loggedUser.user_id;

        const token = jwt.sign({
          loggedUserid
        }, JWT_SECRET)

        return res.status(200).json(
          { message: "User found",
            role: loggedUser.role,
            token: token
          });
    }
    else{
        return res.status(404).json({
            message: "Wrong Credentials",
        });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req:any, res:any) => {
  const { email, password,} = req.body;
  try {
      const {email, password, firstName, lastName, role} = req.body;
      const signupPayload = req.body;
      const parsedSignupPayload = signupBody.safeParse(signupPayload);

      if(!parsedSignupPayload){
        return res.status(406).json({
          message: "Incorrect Inputs"
        })
      }

      const existingUser = await prisma.user.findFirst({
        where: {email}
      });

      if(existingUser){
        return res.status(406).json({
          message: "Email already taken"
        })
      }

      
      const newUser = await prisma.user.create({
          data:{
              email,
              password,
              firstName,
              lastName,
              role
          }
      })

      const userId = newUser._id;

      const token = jwt.sign({
        userId
      }, JWT_SECRET);

      return res.status(200).json({
        message: "User created",
        token: token,
        role: role
      });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router;
