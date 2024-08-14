"use server"
import { getServerSession } from "next-auth";
import { config } from "../auth";
import prisma from "@repo/db/client";

export async function createP2Ptransfer(to: string, amount: number) {
    const session = await getServerSession(config);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        await prisma.$transaction(async (tx) => {

            // Locking the balance row for the user
            // Say if multiple transactions request are made for the same user
            // And the transaction is stuck in the middle of the process and another transaction is made
            // 
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data: {
              fromUserId: Number(from),
              toUserId: toUser.id,
              amount,
              timestamp: new Date(),
            },
          });
    });
});
}