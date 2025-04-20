'use client'
import { signIn, signOut, useSession } from "next-auth/react"
export default function SignInOut(){
    const {data:session}= useSession()
     //get property data from useSession and rename it session
     
if(session){
    return(
     <div>
          <button onClick={signOut}>{session.user.email}  Sign Out</button>
        </div>
    )}
    else {
        return(
            <div>
                   <button onClick={signIn}>Sign IN</button>
               </div>
           )}
    
}