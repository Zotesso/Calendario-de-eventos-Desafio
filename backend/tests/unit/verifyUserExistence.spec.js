const verifyUserExistence = require('../../src/utils/verifyUserExistence');

describe('Verify if exists username in database', () => {
    it('should return the passwrod if username exists', async () => {
        await verifyUserExistence('zotesso').then((user) => {
        expect(user).toEqual(expect.any(String));
      });
    });
});