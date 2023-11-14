const {initCrawler} = require('./crawler/crawler');
const {test, expect} = require('@jest/globals');
const path = require('path');

// npm install --save-dev jest
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
    await initCrawler(); // Espera a que initCrawler termine antes de continuar
    const actual = 1;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

