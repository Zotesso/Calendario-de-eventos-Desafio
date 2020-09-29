const getUserIdByName = require('../../src/utils/getUserIdByName');

describe('Get the user Id by the username', () => {
    it('should return the user_id if username exists', async () => {
        await getUserIdByName('zotesso').then((id) => {
        expect(id).toEqual(expect.any(String));
      });
    });
});