import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.upsert({
	where :{
		number : '1234567890',
	},
	update: {},
    create: {
      email: 'user1@example.com',
      name: 'User One',
      number: '1234567890',
      password: await bcrypt.hash('password1',10),
    },
  });

  const user2 = await prisma.user.upsert({
    where:{
      number :'0987654321',
    },
    update : {},
    create: {
      email: 'user2@example.com',
      name: 'User Two',
      number: '0987654321',
      password: await bcrypt.hash('password2',10),
    },
  });

  // Create Merchants
  const merchant1 = await prisma.merchant.create({
    data: {
      email: 'merchant1@example.com',
      name: 'Merchant One',
      auth_type: 'Google',
    },
  });

  const merchant2 = await prisma.merchant.create({
    data: {
      email: 'merchant2@example.com',
      name: 'Merchant Two',
      auth_type: 'Github',
    },
  });

  // Create OnRampTransactions
  const transaction1 = await prisma.onRampTransaction.create({
    data: {
      status: 'Success',
      token: 'token123',
      provider: 'HDFC Bank',
      amount: 1000,
      startTime: new Date(),
      userId: user1.id,
    },
  });

  const transaction2 = await prisma.onRampTransaction.create({
    data: {
      status: 'Processing',
      token: 'token456',
      provider: 'Provider2',
      amount: 2000,
      startTime: new Date(),
      userId: user2.id,
    },
  });

  // Create Balances
  const balance1 = await prisma.balance.create({
    data: {
      userId: user1.id,
      amount: 5000,
      locked: 0,
    },
  });

  const balance2 = await prisma.balance.create({
    data: {
      userId: user2.id,
      amount: 7000,
      locked: 1000,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

