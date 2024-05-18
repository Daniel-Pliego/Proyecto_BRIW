import e from 'express';
import { UrlData, ProfileData, UserData } from '../../../core/entities/Interface';
import HandlerManager from '../../../infra/store/commands/HandlerManager';
import { stat } from 'fs';

describe('HandlerManager', () => {
    let manager;
    let urlData;
    let profileData;
    let userData;

    beforeEach(() => {
        urlData = new UrlData({
            url: "https://www.google.com",
            name: "Google",
            frecuency: 10,
            id_profile: 1,
            id: "",
            visited: ""
        });
        profileData = new ProfileData({
            id_user: 1,
            name: "Profile",
            id_profile: 1
        });
        userData = new UserData({
            id_user: 1,
            username: "user",
            password: "password"
        });
        manager = new HandlerManager();
        jest.clearAllMocks();
    });

    test('should create a handler manager', () => {
        expect(manager).toBeDefined();
    });

    test('should create a new search profile', async () => {
        const mockResponse = {
            result: {
                insertId: 123, 
            },
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const idProfile = await manager.insertProfile(profileData);

        expect(idProfile).toBeDefined();
        expect(idProfile).toBe(123); 

        expect(fetch).toHaveBeenCalledWith('/api/indexer', expect.anything());
    });

    test('should create a new url', async () => {
        const mockResponse = {
            result: {
                insertId: 123, 
            },
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        await manager.insertURL(urlData);

        expect(fetch).toHaveBeenCalledWith('/api/indexer', expect.anything());
    });

    test('should get urls and profiles', async () => {
        const mockResponse = {
            result: {
                urls: [
                    {
                        id: 1,
                        name: "Google",
                        url: "https://www.google.com",
                        frecuency: 10,
                        id_profile: 1,
                        visited: ""
                    }
                ],
                profiles: [
                    {
                        id_profile: 1,
                        id_user: 1,
                        name: "Profile"
                    }
                ]
            },
        };
    
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        });
    
        const response = await manager.getUrlsAndProfilesName(userData);
    
        expect(response).toEqual(mockResponse);
    
        expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/indexer\?query=/), { method: "GET" });
    });

    test('should index a url', async () => {

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ status: 200}),
            });
        });
        
        urlData.id = 1;

        const response = await manager.indexURL(urlData);

        expect(fetch).toHaveBeenCalledWith("/api/solr", {
            method: "POST",
            body: expect.any(FormData),
        });
        expect(response).toBeDefined();
    });
    
    test('should call a stored procedure', async () => {

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ status: 200 }),
        });

        const response = await manager.callStoredProcedure(urlData.id_user);

        const expectedQuery = `CALL update_visited_status2(${urlData.id_user});`;
        expect(fetch).toHaveBeenCalledWith("/api/indexer", {
            method: "POST",
            body: expectedQuery,
        });
        expect(response).toBeDefined();
    });

    test('should delete a url', async () => {
        const mockResponse = {
            result: {
                success: true,
                status: 200,
            },
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse),
            ok: true,
        });

        urlData.id = 1;

        let query = `DELETE FROM urls WHERE id = ${urlData.id};`;

        await manager.deleteURL(urlData);

        expect(fetch).toHaveBeenCalledWith("/api/indexer", {
            method: "DELETE",
            body: query,
        });
    });
    
    test('should delete a profile', async () => {
        const mockResponse = {
            result: {
                success: true,
                status: 200,
            },
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse),
            ok: true,
        });

        let query = `DELETE FROM users_profiles WHERE id = ${profileData.id_profile};`;

        await manager.deleteProfile(profileData.id_profile);

        expect(fetch).toHaveBeenCalledWith("/api/indexer", {
            method: "DELETE",
            body: query,
        });
    });

    test('should update index url', async () => {
        const mockResponse = {
            result: {
                success: true,
            },
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse),
            ok: true,
        });

        let query = `UPDATE urls SET name = '${urlData.name}', url = '${urlData.url}', visited = 1, frecuency = ${urlData.frecuency} WHERE id = ${urlData.id};`;

        const response = await manager.updateIndexURL(urlData);

        expect(fetch).toHaveBeenCalledWith("/api/indexer", {
            method: "PUT",
            body: query,
        });
        expect(response).toBeDefined();
    });
});
