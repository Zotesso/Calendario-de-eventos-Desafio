const validatePassword = require('../../src/utils/validatePassword');

describe('Validate Password', ( ) => {
    it('should return true if valid password', () => {
        const passToTest = validatePassword("321dasdsak213");
        expect(passToTest).toBe(true);
    });
});