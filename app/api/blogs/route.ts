import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import dbConn from "@/utils/dbConn";
import Blogs from "@/models/blog";



export async function GET(request: NextRequest) {
    await dbConn();
    const blogs = await Blogs.find({});
    return NextResponse.json(blogs)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 401 });
    } else {
        await dbConn();
        let createdblog = await Blogs.create(body);
        return NextResponse.json({
            message: 'blog added succesfully',
            blog: createdblog
        }, { status: 201 });
    }
}