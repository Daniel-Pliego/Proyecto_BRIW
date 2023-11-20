import {returnURLcore} from "public/script/solrClient/solr.js";
const solrUrl = returnURLcore();

//http://localhost:8983/solr/Prueba10/select?facet.field=category&facet.limit=10&facet=true&indent=true&q.op=OR&q=*%3A*
//http://localhost:3000/searcher/search?query=hello
export async function GET(request, { params }) {
    var result;
    const searchParams = request.nextUrl.searchParams
    const slug = params.slug;
     if(slug === 'search'){
        console.log(searchParams);
        const query = searchParams.get('query')
        if (!query) {
            return Response.json({ hello: 'no query' });
        } else {
            const isBooleanQuery = query.includes('AND') || query.includes('OR') || query.includes('NOT');

            if (isBooleanQuery) {
                makeBooleanQuery(query);
            } else {
                result = await makePhraseQuery(query);
                return Response.json(result); 
            }

            return Response.json({ hello: query });
        }
     }
}


function makeBooleanQuery(){

}

async function makePhraseQuery(queryToSearch){
    var query = "";
    if(queryToSearch==="*:*"){
        query = "*:*";
    }else{
        query = 'title:' + encodeURIComponent(queryToSearch) +
        ' OR category:' + encodeURIComponent(queryToSearch) +
        ' OR metaDescription:' + encodeURIComponent(queryToSearch);
    }
    const searchUrl = `${solrUrl}/select?indent=true&q.op=OR&q=${encodeURIComponent(query)}&facet=true&facet.field=${"category"}&facet.limit=${10}&rows=1000`;
    console.log(searchUrl);
    try {
        const response = await fetch(searchUrl);
        const data = await response.text();  // Obtener la respuesta como texto
        const jsonData = JSON.parse(data);
        return jsonData;
      } catch (error) {
        console.error('Error al realizar la consulta a Solr:', error);
      }
}
