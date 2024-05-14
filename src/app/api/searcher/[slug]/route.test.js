import { GET} from './route.js';


class FormDataMock {
    constructor (data) {
        this.nextUrl= {searchParams:data};
      }
      get (key) {
        return this.nextUrl.searchParams[key];
      }

}

describe('Test GET Method to return Solr Query', () =>{
    it('should return a succesful code state if the info exist', async () => {
        const value = "fmat"
        const params = { slug: 'search' };
        const requestMockSearch = new FormDataMock({query:value});

        const response = await GET(requestMockSearch, {params});
        expect(response.status).toBe(200)
      });
});

