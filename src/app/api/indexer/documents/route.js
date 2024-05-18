"use server"
import db from '../../../../infra/database/libs/db';

export async function GET(request) {
    try {
        console.log('GET request');
        const url = new URL(request.url);
        // const id_user = url.searchParams.get('id_user');
        const documentsFound = await db.documents.findMany({
            where: {
                id_user: 1,
            }
        });
        return new Response(JSON.stringify({ status: 200, result: documentsFound }));
    } catch (error) {
        throw error;
    }
}

export async function POST(request) {
    try {
        console.log('POST request');
        const body = await request.json();
        const document = await db.documents.create({
            data: {
                name: body.name,
                updated: new Date(),
                id_user: 1,
            }
        });
        return new Response(JSON.stringify({ status: 200, result: document }));
    } catch (error) {
        throw error;
    }
}

export async function DELETE(request) {
    try {
        console.log('DELETE request');
        const url = new URL(request.url);
        const id_document = url.searchParams.get('id_document');
        const document = await db.documents.delete({
            where: {
                id_document: Number(id_document),
            }
        });
        return new Response(JSON.stringify({ status: 200, result: document }));
    } catch (error) {
        throw error;
    }
}