import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import Blogs from "@/models/blog";
import mongoose from "mongoose";
import dbConn from "@/utils/dbConn";

interface Props {
    params: { id: number }
}

// get single user Blogs from DB
export async function GET(request: NextRequest, { params: { id } }: Props) {

    const blogs = await Blogs.find({uid:id}).sort({ createdAt: -1 });
    if (!blogs) {
        return NextResponse.json({ error: 'No such Blogs' }, { status: 404 });
    }
    return NextResponse.json(blogs, { status: 200 });

}

// update Blogs from DB
export async function PUT(request: NextRequest, { params: { id } }: Props) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'No such Blogs' }, { status: 404 });
    }
    const body = await request.json();

    await dbConn();
    const blogs = await Blogs.findOneAndUpdate(
        { _id: id },
        {
            ...body,
        }
    );
    if (!blogs) {
        return NextResponse.json({ error: "No such Blogs" });
    }
    return NextResponse.json(blogs, { status: 201 });
}


// delete Blogs from DB
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'No such Blogs' }, { status: 404 });
    }
    const blogs = await Blogs.findOneAndDelete({ _id: id });

    if (!blogs) {
        return NextResponse.json({ error: "No such Blogs" });
    }

    return NextResponse.json({ message: 'Blogs deleted succesfully' });
}