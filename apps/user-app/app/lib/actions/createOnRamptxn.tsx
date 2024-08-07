"use server" // This file will be executed on the server , not on the client(frontend).

import { getServerSession } from "next-auth";
import { config } from "../auth";
import prisma from "@repo/db/client";

// Use  : createOnRampTransaction(100, "HDFC bank")
// Need : Records a transaction in the database and returns a message.






export async function createOnRampTransaction(amount : number , provider: string){

    // The user id is a sensitive data , never expose direcly during passing parameters.
    // Instead fetch it from session data.
    const session = await getServerSession(config);
    const user = session?.user;
    const userId = session?.user?.id;

    // If user or userId does not exist , they are not authenticated.
    if(!user || !userId ){
        return {
            mesage: "Unauthenticated request"
        }
    }

    // After our backend initiates a send money action with the bank server,
    // the bank sends a token to identify the person making the transaction.
    // We'll use this token as url parameter to send user to the bank's payment page.
    // Since we don't have a bank server, we'll use a random string for the token variable.

    const token = (Math.random()*1000).toString();



    // As the transation is beginning to initiate
    // Record a processing txn , and update its status later. 
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status : "Processing",
            startTime : new Date(),
            token : token,
            userId : Number(userId),
            amount : amount *100
        }
    });
    return {
        message: "Done"
    }

}