import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo", type: "email" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const userFound = await db.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error("Usuario no encontrado")

                console.log(userFound)

                const matchedPassword = await bcrypt.compare(credentials.password, userFound.password)

                if (!matchedPassword) throw new Error("Contraseña incorrecta")

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,

                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };