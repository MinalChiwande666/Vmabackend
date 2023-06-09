import express from 'express'
import memberreg from '../Model/Member.js'
import nodemailer from 'nodemailer'


import jwt from 'jsonwebtoken'

const router = express.Router()




router.post("/checkmembertype", async (req, res) => {
  let memreg = new memberreg({
    membertype: req.body.membertype
  })
  res.send(memreg)
})      

router.post("/register_member", async (req, res) => {

  const {email} = req.body;

  // Check if email already exists in the database
  const existingMember = await memberreg.findOne({ email });
  if (existingMember) {
    return res.status(400).json({
      code: 400,
      message: 'Email already exists in the database',
    });
  }
else{
  let member = new memberreg({
    membertype: req.body.membertype,
    type_id:req.body.type_id,
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    birth: req.body.birth,
    address: req.body.address,
    gst_number: req.body.gst_number,
    about_company: req.body.about_company,
    course_pursuing: req.body.course_pursuing,
    Institute_name: req.body.Institute_name
  })
  let savemem = await member.save()
  try {
    if (savemem) {
      res.status(200).json({
        code: 200,
        message: 'Succefully registered!!!'
      })
    } else {
      res.send("Something went missing")
    }
  } catch (e) {
    res.status(400).json({
      code: 400,
      message: 'Something went wrong'
    })
  }
}
})

const getemail = async(email,otp) => {
 let mail = nodemailer.createTransport({
  host:'smtp.gmail.com',
  post:587,
  secure:false,
  requireTLS:true,
  auth:{
    user:'minalchiwande2020@gmail.com',
    pass:'qltwyoaauxmwsxcr'
  }
 })

 let info = await mail.sendMail({
  from:'minalchiwande2020@gmail.com',
  to:`${email}`,
  subject:'hello minal',
  text:`Here is your otp to Verify your email ${otp}`
 })


}

router.post('/memberlogin',async(req,res)=>{
  const findemail = await memberreg.findOne({
    email:req.body.email
  })
  try{
    if(!findemail)
    {
      res.status(400).json({
        message:'Invalid Email'
      })
    }else
    {
      res.status(200).json({
        code:200,
        message:'Succefully login'
      })
    }
  }catch(e)
  {
    res.status(400).json({
      message:e
    })
  }
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmFsY2hvd2FuZGUyMDIwQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijc0MTQ5MDI0NzIiLCJ0eXBlX2lkIjozLCJtZW1iZXJ0eXBlIjoiU3R1ZGVudCIsImlhdCI6MTY4NTg2ODcyNH0.MaDfnrG8H_eyVE-mOCGi79tnzJ5fuPTW_gjL5C64LVs
router.post('/generatetoken',async(req,res)=>{
     const data = await memberreg({
      email:req.body.email,
      mobile:req.body.mobile,
      type_id:req.body.type_id,
      membertype:req.body.membertype
     })
     if(data)
     {
      let sign = jwt.sign({email:data.email,mobile:data.mobile,type_id:data.type_id,membertype:data.membertype},'minal')
      if(sign)
      {
        let verify = jwt.verify(sign,'minal')
        res.status(200).json({
          code:{
            code:200
          },
          token:sign,
          payload:verify
        })
      }
     }
})
router.post('/verifyemail', async (req, res) => {
  const { email } = req.body
  let emailfind = await memberreg.findOne({
    email:email
  })

  let otp = Math.floor(100000+Math.random()*900000)
  res.status(200).json({
    message:'Succefully sent otp to your email',
    otp:otp
  })
  getemail(email,otp)
})

router.get('/allmembers',async(req,res)=>{
  const allmem = await memberreg.find()
  res.send(allmem)
})
export default router