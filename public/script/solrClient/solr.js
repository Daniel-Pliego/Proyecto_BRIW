const solr = require('solr-client');
import { v4 as uuidv4 } from 'uuid';

//Cambiar el nombre del core por el que se quiera usar
const nucleoname = 'v2';

const solrClient = solr.createClient({
  host: 'localhost',
  port: 8983,
  core: nucleoname,
  path: '/solr',
});

function returnURLcore() {
  return 'http://localhost:8983/solr/'+nucleoname;
}

function returnURLFileIndexer(){
  return `http://localhost:8983/solr/${nucleoname}/update/extract?literal.id=${uuidv4()}&commit=true`;
}

function returnSolrClient() {
  return solrClient;
}

module.exports = {
  returnSolrClient,
  returnURLcore,
  returnURLFileIndexer
};
