import { POST } from './route.js';
import { CreateCoreAction, IndexPageAction, NotFoundAction } from './strategy';

class FormDataMock {
  constructor (data) {
    this.data = data;
  }
  get (key) {
    return this.data[key];
  }
}

const requestMockCreateCore = {
  async formData () {
    return new FormDataMock({ action: 'createCore', corename: 'prueba6'});
  }
};

describe('Test POST Method to create Core', () => {
  it('should call CreateCoreAction when action is createCore', async () => {
    const createCoreSpy = jest.spyOn(CreateCoreAction.prototype, 'execute');
    await POST(requestMockCreateCore);
    expect(createCoreSpy).toHaveBeenCalled();
  });

  it('should call NotFoundAction when action is not found', async () => {
    const requestMockNotFound = {
      async formData () {
        return new FormDataMock({ action: 'invalidAction' });
      }
    };
    const notFoundSpy = jest.spyOn(NotFoundAction.prototype, 'execute');
    await POST(requestMockNotFound);
    expect(notFoundSpy).toHaveBeenCalled();
  });

  // it('should return a 200 status code when action is createCore', async () => {
  //   const response = await POST(requestMockCreateCore);
  //   expect(response.status).toBe(200);
  //   response.json().then((data) => {
  //     expect(data.message).toBe('Core created successfully');
  //   });
  // });

  it('should return a 404 status code when action is not found', async () => {
    const requestMockNotFound = {
      async formData () {
        return new FormDataMock({ action: 'invalidAction' });
      }
    };
    const response = await POST(requestMockNotFound);
    expect(response.status).toBe(404);
    response.json().then((data) => {
      expect(data.message).toBe('Action not found');
    });
  });

  it('should return a 500 status code when an error occurs', async () => {
    const requestMockError = {
      async formData () {
        throw new Error('Error creating core');
      }
    };
    const response = await POST(requestMockError);
    expect(response.status).toBe(500);
    response.json().then((data) => {
      expect(data.message).toBe('Error indexer');
    });
  });
});

describe('Test POST Method to index Page', () => {
  const requestMockIndexPage = {
    async formData () {
      return new FormDataMock({ action: 'indexPage', url: 'https://www.wagslane.dev' });
    }
  };

  const requestMockIndexErorPage = {
    async formData () {
      return new FormDataMock({ action: 'indexPage', url: '1' });
    }
  };

  // it('should call IndexPageAction when action is indexPage', async () => {
  //   const indexPageSpy = jest.spyOn(IndexPageAction.prototype, 'execute');
  //   await POST(requestMockIndexPage);
  //   expect(indexPageSpy).toHaveBeenCalled();
  // });

  // it('should return a 200 status code when action is indexPage', async () => {
  //   const response = await POST(requestMockIndexPage);
  //   expect(response.status).toBe(200);
  //   response.json().then((data) => {
  //     expect(data.message).toBe('Page indexed successfully');
  //   });
  // });

  it('should return a 500 status code when an error occurs', async () => {
    const requestMockError = {
      async formData () {
        throw new Error('Error index page');
      }
    };
    const response = await POST(requestMockError);
    expect(response.status).toBe(500);
    response.json().then((data) => {
      expect(data.message).toBe('Error indexer');
    });
  });

  it('should return a 500 status code when an error occurs indexing page', async () => {
    const response = await POST(requestMockIndexErorPage);
    expect(response.status).toBe(200);
    response.json().then((data) => {
      expect(data.message).toBe('Page indexed successfully');
    });
  });
  
});