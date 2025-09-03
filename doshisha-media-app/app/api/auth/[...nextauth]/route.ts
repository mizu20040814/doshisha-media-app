import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: 'Admin Login',
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const adminUsername = process.env.ADMIN_USERNAME
            const adminPassword = process.env.ADMIN_PASSWORD

            if (credentials?.username === adminUsername &&
                credentials?.password === adminPassword) {
            return {
                id: '1',
                name: 'Admin',
                email: 'admin@doshisha-media.com'
            }
            }
            return null
        }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60 // 24時間
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login'
    },
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id
        }
        return token
        },
        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string
        }
        return session
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
