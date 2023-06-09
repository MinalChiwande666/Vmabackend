import express from 'express'
import mongoose from 'mongoose'
import router from './route/member.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import routergal from './route/gallery.js'
import cors from 'cors'
const app = express()
// AC3db6682c62245941d3ea312393956194
// 4b1db21f806423cc55d9330291fd02e0

// const connect = async() =>{
//     try{
//         await mongoose.connect('mongodb://192.168.29.229:27017/VMA')
//         console.log("connect")
//     }catch(e)
//     {
//         console.log("something went wrong=>",e)
//     }
// }
app.use(
  cors({
    origin: 'http://register_member',
    methods: ['GET', 'POST'], // Replace with the allowed HTTP methods
  })
);

app.use(express.json())
app.use('/memberregister',router)
app.use('/gallery',routergal)
app.get("/", (req, res) => {
  res.send("Hello, welcome to the API!");
});

app.get("/testing",async(req,res)=>{
    res.send('shinchan shinchan itna pyara pyara.....')
})
let sign;

app.get('/email',async(req,res)=>{
//   res.send("sending mail")
  // sign = jwt.sign({name:'minal',type_id:1},'minal')
  // res.status(200).json({
  //   token:sign
  // })

  // if(sign)
  // {
  //   let verify = jwt.verify(sign,'minal')
  //   console.log(verify)
  // }
})

// app.get('/product',async(req,res)=>{
//     let mail =  nodemailer.createTransport({
//         host:'smtp.gmail.com',
//         port:587,
//         secure:false,
//         requireTLS:true,
//         auth:{
//             user:'minalchiwande2020@gmail.com',
//             pass:'qltwyoaauxmwsxcr'
//         }
//     })
//     let info = await mail.sendMail({
//         from:'minalchiwande2020@gmail.com',
//         to:'minalchiwande2020@gmail.com',
//         subject:"hello minal",
//         text:"my name is minal"
//     })
//     console.log(info)
//    res.send("hello welcome to show!!")
// })
app.listen(4000,(req,res)=>{
    // connect()
    console.log('listening....')
})