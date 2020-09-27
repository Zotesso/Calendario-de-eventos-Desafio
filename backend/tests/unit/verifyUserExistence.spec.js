const verifyUserExistence = require('../../src/utils/verifyUserExistence');

describe('Verify if exists username in database', () => {
    it('should return the password if username exists', async () => {
        const user = await verifyUserExistence('zotesso4');
        expect(user.password).toEqual(expect.any(String));
    });
});