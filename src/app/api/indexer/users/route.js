"use server"
import db from '../../../../infra/database/libs/db';

export async function GET(request) {
    try {
        console.log('GET request');
        const users = await db.users.findMany();
        return new Response(JSON.stringify({ status: 200, result: users }));
    } catch (error) {
        throw error;
    }
}