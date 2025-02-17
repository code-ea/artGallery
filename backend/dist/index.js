"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainRouter = require("./src/routes/routesIndex");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", mainRouter);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
