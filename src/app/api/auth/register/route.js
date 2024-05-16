import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
    try {
        const data = await request.json();

        const mailFound = await db.users.findUnique({
            where: {
                email: data.email
            }
        })

        if (mailFound) {
            return NextResponse.json({ message: "Correo ya registrado" }, { status: 400 })
        }

        const userFound = await db.users.findUnique({
            where: {
                username: data.username
            }
        })

        if (userFound) {
            return NextResponse.json({ message: "Usuario ya registrado" }, { status: 400 })
        }

        // console.log(data)
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.users.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        });

        const { password: _, ...users } = newUser;
        // console.log(users)
        return NextResponse.json(users)


    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        });
    }
}