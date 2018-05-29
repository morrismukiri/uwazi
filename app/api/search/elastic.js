import elasticSearch from 'elasticsearch';

const elastic = new elasticSearch.Client({
  host: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  httpAuth: process.env.ELASTICSEARCH_AUTH || 'elastic:changeme'
});

export default elastic;
