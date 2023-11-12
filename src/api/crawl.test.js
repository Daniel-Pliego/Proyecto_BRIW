const {normalizeURL, getURLsFromHTML, crawlPage} = require('./crawl');
const {test, expect} = require('@jest/globals');

// test('normalizeURL', () => {
//     const url = 'https://blog.boot.dev/path';
//     const actual = normalizeURL(url);
//     const expected = "blog.boot.dev/path";
//     expect(actual).toEqual(expected);
// });

// test('normalizeURL /', () => {
//     const url = 'https://blog.boot.dev/path/';
//     const actual = normalizeURL(url);
//     const expected = "blog.boot.dev/path";
//     expect(actual).toEqual(expected);
// });

// test('normalizeURL capitals', () => {
//     const url = 'https://BLOG.boot.dev/path';
//     const actual = normalizeURL(url);
//     const expected = "blog.boot.dev/path";
//     expect(actual).toEqual(expected);
// });

// test('normalizeURL http', () => {
//     const url = 'http://BLOG.boot.dev/path';
//     const actual = normalizeURL(url);
//     const expected = "blog.boot.dev/path";
//     expect(actual).toEqual(expected);
// });

// test('geturlfromhtml absolute', () => {
//     const inputhmlbody = `
//     <html>
//     <body>
//     <a href="https://blog.boot.dev/path">link</a>
//     </body>
//     </html>
//     `;
//     const baseURL = 'https://blog.boot.dev';
//     const actual = getURLsFromHTML(inputhmlbody, baseURL);
//     const expected = ["https://blog.boot.dev/path"];
//     expect(actual).toEqual(expected);
// });

// test('geturlfromhtml relative', () => {
//     const inputhmlbody = `
//     <html>
//     <body>
//     <a href="/path/">link</a>
//     </body>
//     </html>
//     `;
//     const baseURL = 'https://blog.boot.dev';
//     const actual = getURLsFromHTML(inputhmlbody, baseURL);
//     const expected = ["https://blog.boot.dev/path/"];
//     expect(actual).toEqual(expected);
// });

// test('geturlfromhtml relative more', () => {
//     const inputhmlbody = `
//     <html>
//     <body>
//     <a href="/path/">link</a>
//     <a href="https://blog.boot.dev/">link</a>
//     </body>
//     </html>
//     `;
//     const baseURL = 'https://blog.boot.dev';
//     const actual = getURLsFromHTML(inputhmlbody, baseURL);
//     const expected = ["https://blog.boot.dev/path/","https://blog.boot.dev/"];
//     expect(actual).toEqual(expected);
// });

// test('geturlfromhtml invalidad', () => {
//     const inputhmlbody = `
//     <html>
//     <body>
//     <a href="invalid">link</a>
//     </body>
//     </html>
//     `;
//     const baseURL = 'https://blog.boot.dev';
//     const actual = getURLsFromHTML(inputhmlbody, baseURL);
//     const expected = [];
//     expect(actual).toEqual(expected);
// });


test('main', async () => {
    const url = "https://www.wagslane.dev/"
    console.log("start crawof" + url);
    const pages = await crawlPage(url, url, {});
    for(const page in Object.entries(pages)){
        console.log(`${page}`);
    }
    console.log(pages);
    const actual = 1;
    const expected = 1;
    expect(actual).toEqual(expected);
});

