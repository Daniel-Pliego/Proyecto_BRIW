

async function returnTokens (userInput) {
    let msg = fixedEncodeURIComponent(userInput)
    const response = await fetch(`http://127.0.0.1:8000/tokens?input=${msg}`);
    let data = null
    if (response.ok) {
        data = await response.json();
    };
    return data
}

function fixedEncodeURIComponent (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

module.exports = {
    returnTokens: returnTokens,
    fixedEncodeURIComponent: fixedEncodeURIComponent
};


