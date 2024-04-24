FROM solr:latest

COPY ./solr-config /opt/solr/server/solr/configsets/solr-config

CMD ["solr", "-f"]
