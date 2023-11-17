//https://lbdremy.github.io/solr-node-client/
//https://cwiki.apache.org/confluence/display/solr/MoreLikeThisHandler
import { JSDOM } from 'jsdom';
var solr = require('solr-client')
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

const solrClient = solr.createClient({
    host: 'localhost',
    port: 8983,
    core: 'Prueba2',
    path: '/solr',
});

function getURLsFromHTML(htmlBody, baseURL) {
    const urlsSet = new Set();
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkElement of linkElements) {
        let href;
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                href = urlObj.href;
            } catch (e) {
                console.log("error del url storage");
                continue; 
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                href = urlObj.href;
            } catch (e) {
                console.log("error del url storage");
                continue; 
            }
        }
        if (!urlsSet.has(href)) {
            urlsSet.add(href);
        }
    }

    const urls = Array.from(urlsSet);
    return urls;
}

async function indexData(htmlBody, baseURL){
    const metaTags = getMetaTagsFromHTML(htmlBody);
    const titleTag = getTitleTagFromHTML(htmlBody);
    //const lenguage = getLenguageFromHTML(htmlBody, metaTags);
    //const category = await getCategoryFromHTML(htmlBody, metaTags);
    const dataIndex = makeObjecttoIndex(metaTags, titleTag, baseURL);
    sendDataToSolrClient(JSON.parse(JSON.stringify(dataIndex)));
}

function getMetaTagsFromHTML(html) {
    const dom = new JSDOM(html);
    return dom.window.document.querySelectorAll('meta');
}

function getTitleTagFromHTML(html) {
    const dom = new JSDOM(html);
    return dom.window.document.querySelector('title');
}

async function getCategoryFromHTML(htmlBody, metaTags, lenguage){
    let keywords = [];
    if(lenguage === 'spanish'){
        keywords = extractKeywords(metaTags);
        const spanishKeywords = [];
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            const relatedSpanishKeywords = await getSpanishKeywordsFromAPI(keyword);
            spanishKeywords.push(relatedSpanishKeywords);
        }
        console.log(spanishKeywords);
    }else{
        keywords = extractKeywords(metaTags);
        const spanishKeywords = [];
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            const relatedSpanishKeywords = await getKeywordsFromAPI(keyword);
            spanishKeywords.push(relatedSpanishKeywords);
        }
        console.log(spanishKeywords);
    }
}

async function getSpanishKeywordsFromAPI(keyword) {
    const apiUrl = `https://api.datamuse.com/words?sl=${encodeURIComponent(keyword)}&v=es`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const spanishKeyword = data[0]?.word;
        return spanishKeyword || keyword;
    } catch (error) {
        console.error(error);
        return keyword;
    }
}

async function getKeywordsFromAPI(keyword) {
    const apiUrl = `https://api.datamuse.com/words?sl=${encodeURIComponent(keyword)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const keywordResult = data[0]?.word;
        return keywordResult || keyword;
    } catch (error) {
        console.error(error);
        return keyword;
    }
}

function extractKeywords(metaTags){
    let description;
    let keywords = [];
    let keywordsAUX = [];
    metaTags.forEach((tag) => {
        const tagName = tag.getAttribute('name');
        const tagProperty = tag.getAttribute('property');
        const tagContent = tag.getAttribute('content');
        if (tagName === 'description' || tagProperty === 'og:description') {
            description = tagContent;
        }
    });

    if (description) {
        keywords = description.split(' ');
        keywordsAUX = removeStopwords(keywords);
    }
    return keywordsAUX;
}

function getLenguageFromHTML(htmlBody, metaTags){
    let title, description;

    metaTags.forEach((tag) => {
        const tagName = tag.getAttribute('name');
        const tagProperty = tag.getAttribute('property');
        const tagContent = tag.getAttribute('content');
        if (tagName === 'title') {
            title = tag.textContent;
        } else if (tagName === 'description' || tagProperty === 'og:description') {
            description = tagContent;
        }
    });

    let text = title + " " + description;
    var leng = lngDetector.detect(text, 1);
    return leng[0][0]
}

function makeObjecttoIndex(metaTags, titleTag, urlB, categoryB) {
    const result = {
        title: titleTag ? titleTag.text : '',
        metaTitle: '',
        metaType: '',
        metaDescription: '',
        url: 'urlB',
        category: 'categoryB'
    };

    metaTags.forEach((tag) => {
        const tagName = tag.getAttribute('name');
        const tagProperty = tag.getAttribute('property');
        const tagContent = tag.getAttribute('content');

        if (tagName === 'title') {
            result.title = tag.textContent;
        } else if (tagProperty === 'og:title') {
            result.metaTitle = tagContent;
        } else if (tagProperty === 'og:type') {
            result.metaType = tagContent;
        } else if (tagName === 'description' || tagProperty === 'og:description') {
            result.metaDescription = tagContent;
        }
    });
    return result;
}

function sendDataToSolrClient(data) {
    console.log("data", data);
    solrClient.add(data, function(err, obj) {
        if (err) {
            console.error('Error al indexar el documento en Solr:', err);
        } else {
            // Confirma los cambios
            solrClient.commit(function(err, res) {
                if (err) {
                    console.error('Error al confirmar el cambio en Solr:', err);
                } else {
                    console.log('Documento indexado con éxito en Solr:', res);
                }
            });
        }
    });
}

function removeStopwords(words) {
    return words.filter(word => !stopwords.includes(word.toLowerCase()));
}

const stopwords = [
    'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para',
    'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este',
    'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta',
    'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra',
    'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo',
    'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual',
    'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti',
    'tu', 'tus', 'ellas', 'nosotras', 'vosotros', 'vosotras', 'os', 'mío', 'mía', 'míos', 'mías', 'tuyo',
    'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro', 'nuestra', 'nuestros', 'nuestras',
    'vuestro', 'vuestra', 'vuestros', 'vuestras', 'esos', 'esas', 'estoy', 'estás', 'está', 'estamos', 'estáis',
    'están', 'esté', 'estés', 'estemos', 'estéis', 'estén', 'estaré', 'estarás', 'estará', 'estaremos', 'estaréis',
    'estarán', 'estaría', 'estarías', 'estaríamos', 'estaríais', 'estarían', 'estaba', 'estabas', 'estábamos', 'estabais',
    'estaban', 'estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron', 'estuviera', 'estuvieras', 'estuviéramos',
    'estuvierais', 'estuvieran', 'estuviese', 'estuvieses', 'estuviésemos', 'estuvieseis', 'estuviesen', 'estando', 'estado', 'estada',
    'estados', 'estadas', 'estad', 'he', 'has', 'ha', 'hemos', 'habéis', 'han', 'haya', 'hayas', 'hayamos', 'hayáis', 'hayan', 'habré',
    'habrás', 'habrá', 'habremos', 'habréis', 'habrán', 'habría', 'habrías', 'habríamos', 'habríais', 'habrían', 'había', 'habías',
    'habíamos', 'habíais', 'habían', 'hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron', 'hubiera', 'hubieras', 'hubiéramos',
    'hubierais', 'hubieran', 'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen', 'habiendo', 'habido', 'habida', 'habidos',
    'habidas', 'soy', 'eres', 'es', 'somos', 'sois', 'son', 'sea', 'seas', 'seamos', 'seáis', 'sean', 'seré', 'serás', 'será', 'seremos',
    'seréis', 'serán', 'sería', 'serías', 'seríamos', 'seríais', 'serían', 'era', 'eras', 'éramos', 'erais', 'eran', 'fui', 'fuiste', 'fue',
    'fuimos', 'fuisteis', 'fueron', 'fuera', 'fueras', 'fuéramos', 'fuerais', 'fueran', 'fuese', 'fueses', 'fuésemos', 'fueseis', 'fuesen',
    'sintiendo', 'sentido', 'sentida', 'sentidos', 'sentidas', 'siente', 'sentid', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen',
    'tenga', 'tengas', 'tengamos', 'tengáis', 'tengan', 'tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán', 'tendría', 'tendrías',
    'tendríamos', 'tendríais', 'tendrían', 'tenía', 'tenías', 'teníamos', 'teníais', 'tenían', 'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis',
    'tuvieron', 'tuviera', 'tuvieras', 'tuviéramos', 'tuvierais', 'tuvieran', 'tuviese', 'tuvieses', 'tuviésemos', 'tuvieseis', 'tuviesen', 'teniendo',
    'tenido', 'tenida', 'tenidos', 'tenidas', 'tened','i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself',
    'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them'
];

module.exports = {
    getURLsFromHTML: getURLsFromHTML,
    indexData: indexData
}