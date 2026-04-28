import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Resend({
            from: "onboarding@resend.dev",
        }),
    ],
})
