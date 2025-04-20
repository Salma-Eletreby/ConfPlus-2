import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import  SpotifyProvider from "next-auth/providers/spotify";
export const authOptions={
  providers:[
      CredentialsProvider({
        name: "Credentials",
        credentials: {        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const response =await fetch ("http://localhost:3000/api/users/login",{
          method:"POST",
          body: JSON.stringify(credentials),
          headers:{"Content-Type":"application/json"},
        })
        const user = await response.json()
        console.log(user)
        if (!user.error&&response.ok) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            name: user.firstName,
            email: user.email,
            role: user.role,
          };
        } else {
          return null
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }),

    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
   
    })
  
 ], 
 pages:{      
  signIn:"/login"
},
callbacks: {
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token and user id from a provider.
    if (token && user) {
      session.user.provider = token.provider;
    } else if (session && session.accessToken) {
      session.user.provider = "credentials";
    }
    return session;
  }
  },

};
const handler =NextAuth(authOptions)
export {handler as GET, handler as POST}