import { GET, buildQuery, isAcceptedOperator, addSearchingOperator, generateSimilarWordsQuery} from './route.js';
class FormDataMock {
    constructor (data) {
        this.nextUrl= {searchParams:data};
      }
      get (key) {
        return this.nextUrl.searchParams[key];
      }
}

describe('Test GET Method to return Solr Query', () =>{
  it('should return the query to be used in the solr Query', async () => {
    const userInput = "fmat"
    const response = await buildQuery(userInput);
    expect(response).toBe("(title:fmat~1 OR category:fmat~1 OR metaDescription:fmat~1)");
  });

  it('should return a successful code state if the info exist', async () => {
    const value = "fmat"
    const params = { slug: 'search' };
    const requestMockSearch = new FormDataMock({query:value});
    const response = await GET(requestMockSearch, {params});
    expect(response.status).toBe(200)
  });

});

describe('Test isAcceptedOperator function', () =>{
  it('should return false', async () => {
    const input = "fmat"
    const response = isAcceptedOperator(input);
    expect(response).toBe(false);
  });

  it('should return true', async () => {
    const input = "and"
    const response = isAcceptedOperator(input);
    expect(response).toBe(true);
  });

});

describe('Test generateSimilarWordsQuery function', () => {

  it('should generate a query for a single term', () => {
    const term = "example";
    const expectedQuery = 'title:example~1 OR category:example~1 OR metaDescription:example~1';
    
    const query = generateSimilarWordsQuery(term);
    expect(query).toBe(expectedQuery);
  });

  it('should generate a query for multiple terms', () => {
    const terms = ["example1", "example2", "example3"];
    const expectedQuery = 
      'title:example1~1 OR category:example1~1 OR metaDescription:example1~1 OR ' +
      'title:example2~1 OR category:example2~1 OR metaDescription:example2~1 OR ' +
      'title:example3~1 OR category:example3~1 OR metaDescription:example3~1';

    const query = generateSimilarWordsQuery(terms);
    expect(query).toBe(expectedQuery);
  });

  it('should generate a query for an empty array', () => {
    const terms = [];
    const expectedQuery = '';

    const query = generateSimilarWordsQuery(terms);
    expect(query).toBe(expectedQuery);
  });

  it('should handle null input', () => {
    const terms = null;
    const expectedQuery = 'title:null~1 OR category:null~1 OR metaDescription:null~1';

    const query = generateSimilarWordsQuery(terms);
    expect(query).toBe(expectedQuery);
  });

  it('should handle undefined input', () => {
    const terms = undefined;
    const expectedQuery = 'title:undefined~1 OR category:undefined~1 OR metaDescription:undefined~1';

    const query = generateSimilarWordsQuery(terms);
    expect(query).toBe(expectedQuery);
  });

});