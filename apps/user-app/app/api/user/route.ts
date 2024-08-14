import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { config } from "../../lib/auth";

/*
The api/user/route.ts file in a Next.js application typically serves as an API endpoint
 for handling user-related operations,such as fetching, updating, or deleting user data. 
It's part of the backend logic that you expose to the frontend or other parts of your application.*/


// Here it just checks if the user is logged in or not

export const GET = async () => {
    const session = await getServerSession(config);
    if (session?.user) {
        return NextResponse.json({
            user: session.user,
            message : "You are logged in"
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}