const authenticateToken = require('../../src/utils/authenticateToken');

describe('Authenticate the user access token', ( ) => {
    it('should return false because im not authorized', () => {
        const authorization = authenticateToken('Teste fail')
        
        expect(authorization).toBe(false);
        
    });
});