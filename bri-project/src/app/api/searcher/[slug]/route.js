import { split } from "postcss/lib/list";
import { returnURLcore } from "public/script/solrClient/solr.js";
import { Query } from "solr-client";
const solrUrl = returnURLcore();

//http://localhost:8983/solr/Prueba10/select?facet.field=category&facet.limit=10&facet=true&indent=true&q.op=OR&q=*%3A*
//http://localhost:3000/searcher/search?query=hello
export async function GET(request, { params }) {
    var result;
    const searchParams = request.nextUrl.searchParams
    const slug = params.slug;
    if (slug === 'search') {
        console.log(searchParams);
        const query = searchParams.get('query')
        if (!query) {
            return Response.json({ hello: 'no query' });
        } else {
            const isBooleanQuery = query.includes('AND') || query.includes('OR') || query.includes('NOT');

            if (isBooleanQuery) {
                result = await makeBooleanQuery(query);
            } else {
                result = await makePhraseQuery(query);
            }

            return Response.json(result);
            //return Response.json({ hello: query });
        }
    }
}

function removeAccents(accentedPhrase) {
    return accentedPhrase.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

async function addSearcherOperation(word, tokenPrevious, query) {
    query += tokenPrevious + " (" + generateSimilarWordsQuery(await similarWords(word)) + ") ";
    return query;
}

async function makeBooleanQuery(userInput) {
    var querySolr = `${solrUrl}` + '/select?indent=true&q.op=OR&q=';

    userInput = userInput.toLocaleLowerCase('es');
    var query = "";

    let tokens = userInput.split(" ");

    query += "(" + generateSimilarWordsQuery(await similarWords(tokens[0])) + ") ";
    let tokenPrevious = "elemento";

    for (let i = 1; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token) {
            case "and":
                tokenPrevious = "AND";
                break;
            case "or":
                tokenPrevious = "OR";
                break;
            case "not":
                tokenPrevious = "NOT";
                break;
            default:
                query = await addSearcherOperation(token, tokenPrevious, query);
                tokenPrevious = "elemento";
                break;
        }
    }

    let scoreSortDescendant = "&sort=score+desc&fl=*,+score";

    querySolr = querySolr + fixedEncodeURIComponent(query) + `&facet=true&facet.field=${"category"}&facet.limit=${10}&rows=1000` + scoreSortDescendant;
    console.log(querySolr);
    try {
        const response = await fetch(querySolr);
        const data = await response.text();  // Obtener la respuesta como texto
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error al realizar la consulta a Solr:', error);
    }
}

function fixedEncodeURIComponent(str) { //*Para codificar inclusive caracteres que no codifica el encode normal
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

function generateSimilarWordsQuery(terms) {
    var query = "";
    let op = "OR";
    for (let i = 0; i < terms.length; i++) {
        if (i == 0 || i == terms.length) {
            query += 'title:' + terms[i] + ' ' + op + ' category:' + terms[i] + ' ' + op + ' metaDescription:' + terms[i];
        } else {
            query += ' ' + op + ' title:' + terms[i] + ' ' + op + ' category:' + terms[i] + ' ' + op + ' metaDescription:' + terms[i];
        }
    }
    query = removeAccents(query);
    return query;
}

async function getSimilarMatrix(array, noun) {
    let max = 20 - noun.length;
    let response = await fetch(
        `https://api.datamuse.com/words?ml=${noun}&v=es&max=${max}`
    );

    if (response.ok) {
        let json = await response.json();
        json.forEach(result => {
            array.push(result["word"]);
        });
    }
    return array;
}

async function similarWords(noun) { //* Por palabra
    var similar = [];
    similar = await getSimilarMatrix(similar, noun);
    console.log("ARRAY:> " + similar + "\n"); //! Muestra los sinonimos de una palabra, quitar antes de terminar proyecto
    return similar; //* Array de palabras similares a la palabra original
}

async function makePhraseQuery(queryToSearch) {
    var query = "";
    if (queryToSearch === "*:*") {
        query = "*:*";
    } else {
        query += "(" + generateSimilarWordsQuery(await similarWords(queryToSearch)) + ")";
    }
    const searchUrl = `${solrUrl}/select?indent=true&q.op=OR&q=${fixedEncodeURIComponent(query)}&facet=true&facet.field=${"category"}&facet.limit=${10}&rows=1000&sort=score+desc&fl=*,+score`;
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
