import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import dbConn from "@/utils/dbConn";
import Users from "@/models/user";



export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 401 });
    } else {
        await dbConn();
        await Users.create(body);
        return NextResponse.json({
            message: 'user added succesfully'
        }, { status: 201 });
    }
}