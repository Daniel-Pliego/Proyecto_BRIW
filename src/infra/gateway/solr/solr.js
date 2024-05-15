const solr = require('solr-client');
import { v4 as uuidv4 } from 'uuid';

const coreName = process.env.CORE_NAME;
const solrHost = process.env.SOLR_HOST;
const solrPort = process.env.SOLR_PORT;

const solrClient = solr.createClient({
  host: solrHost,
  port: 8983,
  core: solrPort,
  path: '/solr',
});

function returnURLcore () {
  return 'http://localhost:8983/solr/'+coreName;
}

function returnURLFileIndexer (){
  return `http://localhost:8983/solr/${coreName}/update/extract?literal.id=${uuidv4()}&commit=true`;
}

function returnSolrClient () {
  return solrClient;
}

module.exports = {
  returnSolrClient,
  returnURLcore,
  returnURLFileIndexer
};
