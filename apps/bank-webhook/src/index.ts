import express from "express"
import db from "@repo/db/client"
const app = express();

// Use : Updates balance change (Balance[]table) & saves transaction details in onRampTransaction[] table

app.post("/hdfcWebhook", async(req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };


    try {

        // We want balance updattion and onRampTransaction updation(recording the transaction)
        // at the same time
        await db.$transaction([

            db.balance.update({
                where:{
                    userId : Number(paymentInformation.userId)
                },
                data:{
                    amount : {
                        // Also can fetch incremet data from db
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),

            db.onRampTransaction.updateMany({
                where:{
                    token : paymentInformation.token,
                },
                data:{
                    status :"Success"
                }
                
            })

        ]);

        // If transaction is successfull
        res.status(200).json({
            message : "captured"
        });
        
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        }) 
    }

});

app.listen(3003);
