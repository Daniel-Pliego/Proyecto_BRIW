const urlsBase = [
  {
      name: "url1",
      url:"https://www.wagslane.dev/",
      visited: false
  },
  {
      name: "url2",
      url:"https://es.wikipedia.org/wiki/Amazon",
      visited: false
  }
]

function getUrlsFromMock() {
  const foundUrls = urlsBase.map(enlace => enlace.url);
  return foundUrls;
}

module.exports = {
  getUrlsFromFile: getUrlsFromMock, 
};