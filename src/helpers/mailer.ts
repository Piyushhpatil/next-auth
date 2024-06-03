import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "131298d654dffc",
            pass: "3ec18cd949e44e"
          }
        });
          const mailOptions = {
            from: 'unknownguy1297@unknown.ai',
            to: email ,
            subject: emailType ==="VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>CLick <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email": "reset your password"} or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}