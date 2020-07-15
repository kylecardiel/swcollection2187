import { Color } from 'shared/styles/color';


describe('Color', () => {
    describe('when color exists', () => {
        it('should return the correct color', () => {
            expect(Color.primary('blue')).toBe('#1b6ef5');
            expect(Color.primary('yellow')).toBe('#fac519');
            expect(Color.primary('green')).toBe('green');
            expect(Color.primary('grey')).toBe('grey');
            expect(Color.primary('lightGrey')).toBe('#aeb2b8');
            expect(Color.primary('white')).toBe('#ffffff');
            expect(Color.primary('eliteRed')).toBe('#d60002');
            expect(Color.primary('eliteRedGradient')).toBe('radial-gradient(circle, rgba(214,0,2,1) 0%, rgba(125,40,40,1) 50%, rgba(214,0,2,1) 100%)');
            expect(Color.primary('eliteBlackGradient')).toBe('radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(135,135,147,1) 0%, rgba(0,0,0,1) 100%)');
        });
    });
    describe('when color does not exists', () => {
        it('should return defualt color', () => {
            expect(Color.primary('test')).toBe('black');
        });
    });
});