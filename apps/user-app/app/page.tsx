
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { config } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(config);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
  
}