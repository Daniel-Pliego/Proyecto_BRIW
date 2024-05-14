import { GET, buildQuery} from './route.js';


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