import { getServerSession } from "next-auth";
import { P2PCard } from "../../../components/P2PCard";
import { P2PlogCard } from "../../../components/P2PlogCard";
import { config } from "../../lib/auth";
import prisma from "@repo/db/client";


async function getP2Ptransfer() {
    const session = await getServerSession(config);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        
    }
))
}

export default async function() {

    const transactions = await getP2Ptransfer();



    return<div className="w-full">
    <P2PCard/>
    <div>
        <P2PlogCard transactions={transactions}/>
    </div>


    
    </div>
}