import express from "express"
import db from "@repo/db/client"
const app = express();
app.use(express.json());


// Use : POST http://localhost:3003/hdfcWebhook -d {token : "1234", user_identifier : "1", amount : "100"}
// Need : A webhook to capture the payment information from the bank.

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

        // We want balance updation and onRampTransaction updation (recording the transaction) at the same time.
        // Trnasaction helps in such case.
        await db.$transaction([


            // Update the balance of the user
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

            // Update the transaction status
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
