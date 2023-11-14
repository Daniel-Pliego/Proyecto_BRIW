//https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import {initCrawler} from "public/script/crawler/crawler.js";

export async function GET(request) {
    await initCrawler();
    return Response.json({ helo:"hello" });
}