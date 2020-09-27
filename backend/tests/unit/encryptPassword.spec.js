const encryptPassword = require('../../src/utils/encryptPassword');

describe('Generate Hashed Password', ( ) => {
    it('should generate an hashed password', () => {
       encryptPassword('teste', 8).then((hash) => {
            expect(hash).toEqual(expect.any(String));
        });
    });
});