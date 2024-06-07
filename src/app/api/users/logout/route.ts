import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function GET(requset: NextRequest){
    try {
        const response = NextResponse.json({
            message: "logout succesfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true, 
            expires: new Date(0)
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}