import { returnURLcore } from "../../../../infra/gateway/solr/solr.js";
import { returnTokens, fixedEncodeURIComponent } from "../../../../core/utils/searcher/tokenizer.js"
import { returnSynonyms } from "../../../../core/utils/searcher/expander.js"
const solrUrl = returnURLcore();

export async function GET (request, { params }) {
    var result;
    const searchParams = request.nextUrl.searchParams
    const slug = params.slug;
    if (slug === 'search') {
        console.log(searchParams)
        let query = ""
        if(searchParams.query){
            query = searchParams['query']
        } else {
            query = searchParams.get('query')
        }
        
        if (!query) {
            return Response.json({ hello: 'no query' });
        } else {
            const solQuery = await buildQuery(query)
            result = await searchDocuments(solQuery)
            return Response.json(result);
        }
    }
}

export function isAcceptedOperator (word) {
    return word == "not" || word == "and" || word == "or"
}
export async function addSearchingOperator (word, tokenPrevious, query, lang) {
    var similarWordsResult = []
    if (lang != 'notFound') {
        similarWordsResult = await returnSynonyms(word, lang)
    }
    if (similarWordsResult == null && !isAcceptedOperator(word)) {
        return query
    }
    console.log("Synonyms:> " + similarWordsResult + "\n");

    if (typeof query === "string" && query.length === 0 && !isAcceptedOperator) {
        tokenPrevious = ""
    }

    if (similarWordsResult.length > 0) {
        query += tokenPrevious + "(" + generateSimilarWordsQuery(similarWordsResult) + ")";
    } else {
        query += tokenPrevious + "(" + generateSimilarWordsQuery(word) + ")";
    }
    return query;
}

export async function buildQuery (userInput) {
    var query = "";
    if (userInput === "*:*") {
        query = "*:*";
    } else {
        let tokensDict = await returnTokens(userInput)
        console.log(tokensDict)
        let language = tokensDict["language"]
        let tokens = tokensDict["tokens"]

        let tokenPrevious = "";

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            switch (token) {
                case "and":
                    tokenPrevious = " AND ";
                    break;
                case "or":
                    tokenPrevious = " OR ";
                    break;
                case "not":
                    tokenPrevious = " NOT ";
                    break;
                default:
                    query = await addSearchingOperator(token, tokenPrevious, query, language);
                    tokenPrevious = " OR ";
                    break;
            }
        }

    }
    console.log("Query:> " + query + "\n");
    return query
}

async function searchDocuments (query) {
    var querySolr = `${solrUrl}` + '/select?indent=true&q.op=OR&q=';
    let scoreSortDescendant = "&sort=score+desc&fl=*,+score";

    const searchUrl = querySolr + fixedEncodeURIComponent(query) + `&facet=true&facet.field=${"category"}&facet.limit=${10}&rows=1000` + scoreSortDescendant;

    console.log("QuerySolrCalled:>\n" + searchUrl);
    try {
        const response = await fetch(searchUrl);
        const data = await response.text();
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error al realizar la consulta a Solr:', error);
    }
}

export function generateSimilarWordsQuery (terms) {
    var query = "";
    let op = "OR";

    if (Array.isArray(terms)) {
        for (let i = 0; i < terms.length; i++) {
            if (i == 0 || i == terms.length) {
                query += 'title:' + terms[i] + '~1 ' + op + ' category:' + terms[i] + '~1 ' + op + ' metaDescription:' + terms[i] + '~1';
            } else {
                query += ' ' + op + ' title:' + terms[i] + '~1 ' + op + ' category:' + terms[i] + '~1 ' + op + ' metaDescription:' + terms[i] + "~1";
            }
        }
    } else {
        query += 'title:' + terms + '~1 ' + op + ' category:' + terms + '~1 ' + op + ' metaDescription:' + terms + '~1';
    }
    return query;
}
