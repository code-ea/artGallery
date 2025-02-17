// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export async function insertUser(email:string, password:string, firstName:string, lastName:string) {
//     const res = await prisma.user.create({
//         data:{
//             email,
//             password,
//             firstName,
//             lastName
//         }
//     })
//     //console.log(res);
// }

// //insertUser("nitin@gmail.com","123456","nitin","singh");

// export async function insertAdmin(email:string, password:string, firstName:string, lastName:string) {
//     const res = await prisma.admin.create({
//         data:{
//             email,
//             password,
//             firstName,
//             lastName
//         }
//     })
// }

// interface UpdateParams {
//     firstName: string;
//     lastName: string;
// }

// export async function updateUser(email:string, {
//     firstName,
//     lastName
// }: UpdateParams){
//     const res = await prisma.user.update({
//         where:{email},
//         data:{
//             firstName,
//             lastName
//         }
//     });
//     console.log(res);
// }

// // updateUser("nitin@gmail.com",{
// //     firstName:"Nitin",
// //     lastName:"Kumar"
// // })

// export async function updateAdmin(email:string, {
//     firstName,
//     lastName
// }: UpdateParams){
//     const res = await prisma.admin.update({
//         where:{email},
//         data:{
//             firstName,
//             lastName
//         }
//     });
// }

// export async function getUser(email:string){
//     const res = await prisma.user.findFirst({
//         where:{
//             email
//         }
//     })
//     console.log(res);
// }

// //getUser("nitin@gmail.com");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const mainRouter = require("./routes/index");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});