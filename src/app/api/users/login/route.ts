import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(requset: NextRequest){
    try {
        const reqBody = await requset.json()
        const {username, email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }
        console.log("User Exists")

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: "Check Your Password"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "logged in Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}