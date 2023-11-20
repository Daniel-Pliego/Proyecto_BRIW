const solr = require('solr-client');

const solrClient = solr.createClient({
  host: 'localhost',
  port: 8983,
  core: 'Prueba10',
  path: '/solr',
});

function returnURLcore(){
  return 'http://localhost:8983/solr/Prueba10';
}

function returnSolrClient(){
  return solrClient;
}

module.exports = {
  returnSolrClient,
  returnURLcore
};
