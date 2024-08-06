import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";


export const config  = {

	

	providers:[
		// Inhouse provider that only accepts phone number and password
		// Others that can be used are : google , github etc.
	CredentialsProvider({
		name : 'Credentials',
		credentials: {
			phone:{label: "Phone number", type:"text", placeholder:"+91 0000 000000"},
			password:{label:"Password", type:"password"}
		},

		


		async authorize(credentials){


			if (!credentials) {
				return null;
			  }


		// Do zod validation , OPT vlidation here
			const hashedPassword = await bcrypt.hash(credentials.password,10);
			const existingUser  = await db.user.findFirst({
				where:{
					number : credentials.phone
				}
			});

			if (existingUser) {
				const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
				if (isPasswordValid) {
					return {
						id: existingUser.id.toString(),
						name: existingUser.name,
						email: existingUser.email,
					}

				}
			}

			// If the user dos not exit then the flow comes here finding a return statement

			try{
				const user = await db.user.create({
					data:{
						number: credentials.phone,
						password: hashedPassword
					}
				});
				return {
					id: user.id.toString(),
					name: user.name,
					email: user.email,
				}
			}catch(e){
				console.error(e);
				return null;
			}


		},
	})
	],
	secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
	}
}
