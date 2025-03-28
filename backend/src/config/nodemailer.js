import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({path:'backend/src/config/smtp.env'})

const SMTP_PORT=process.env.SMTP_PORT
const SMTP_SERVER=process.env.SMTP_SERVER
const SMTP_USER=process.env.SMTP_USER
const SMTP_PASS=process.env.SMTP_PASS

const transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: SMTP_PORT,
    auth:{
        user:SMTP_USER,
        pass:SMTP_PASS,
    }
});

// transporter.verify((e,s)=>{
//     if(e){
//         console.log(e)
//     }else{
//         console.log("first")
//     }
// })

export default transporter