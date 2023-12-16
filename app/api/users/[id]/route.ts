import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/user";
import dbConn from "@/utils/dbConn";

interface Props {
    params: { id: number }
}

// get single user Blogs from DB
export async function GET(request: NextRequest, { params: { id } }: Props) {
    await dbConn();
    const users = await Users.find({ uid: id });
    if(users.length < 1){
        return NextResponse.json({ error: 'No such User' }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
    
}

