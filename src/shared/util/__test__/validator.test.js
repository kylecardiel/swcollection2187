import { Validator } from 'shared/util/validator';

describe('Validator', () => {

    describe('.isEmailValid', () => {
        it('should return true for valid email', () => {
            const validEmail = 'k.c@gmail.com';
            expect(Validator.isEmailValid(validEmail)).toBeTruthy();
        });

        it('should return false for email missing an @', () => {
            const validEmail = 'k.cgmail.com';
            expect(Validator.isEmailValid(validEmail)).toBeFalsy();
        });

        it('should return false for email missing an ending like .com', () => {
            const validEmail = 'k.c@gmail';
            expect(Validator.isEmailValid(validEmail)).toBeFalsy();
        });

        it('should return false for email missing characters infront of @', () => {
            const validEmail = '@gmail.com';
            expect(Validator.isEmailValid(validEmail)).toBeFalsy();
        });
    });
});