
async function returnSynonyms (word, language) {
    const response = await fetch(`http://127.0.0.1:8000/synonyms?word=${word}&language=${language}`);
    let data = null
    if (response.ok) {
        data = await response.json();
    };
    return data

}

module.exports = {
    returnSynonyms: returnSynonyms
};