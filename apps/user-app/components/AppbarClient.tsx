"use client"
import {signIn,signOut , useSession} from "next-auth/react";
import {Appbar} from "@repo/ui/AppBar";
import { useRouter } from "next/navigation";

export function AppbarClient (){

    // useSession is a hook provided by next-auth/react
    // It returns the session object
    /*
        data: 
            expires: "2024-09-13T21:19:19.629Z"
            user: {name: 'User One', email: 'user1@example.com', id: '1'}
        status: "authenticated"
    */
    const session = useSession();


    // Router is used to manipulate the url
    const router = useRouter();




    return (
        <div>
            <Appbar onSignin={signIn} onSignout={async ()=>{
                    await signOut();
                    router.push("/api/auth/signin");
            }} user={session.data?.user}/>

        </div>
    )
}

