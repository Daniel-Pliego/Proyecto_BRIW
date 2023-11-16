//https://nextjs.org/docs/app/building-your-application/routing/route-handlers
//https://dev.to/this-is-learning/readwrite-on-local-json-file-with-nextjs-part-51-8gg

import {initCrawler} from "public/script/crawler/crawler.js";
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/urlbase.json');

// query is "hello" for /api/search?query=hello
  //http://localhost:3000/indexer/read
export async function GET(request, { params }) {
    const searchParams = request.nextUrl.searchParams
    console.log(searchParams);
    if(searchParams.length > 0){
        const query = searchParams.get('query')
        return Response.json({ helo:query });
    }else{
        const slug = params.slug;
        if(slug === 'index'){
            await initCrawler();
            return Response.json({ helo:"indexado" });
        }else if(slug === 'read'){
            const jsonData = await fsPromises.readFile(dataFilePath);
            const objectData = JSON.parse(jsonData);
            return Response.json(objectData);
        }
    }
}
