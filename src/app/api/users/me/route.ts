import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { getDataFromToken } from "@/helpers/getDataFromToken";



connect()

export async function POST(request:NextRequest) {
    getDataFromToken(request)
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status:400})
    }
    return NextResponse.json({
        message: "User Found",
        data:user
    })
}