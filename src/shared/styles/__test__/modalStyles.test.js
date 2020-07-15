import { modalStyles, getModalSize } from 'shared/styles/modalStyles';

describe('modalStyles', () => {
    describe('getModalSize', () => {
        let isMobileDevice, expectedResults;

        it('should return large modal Size', () => {
            isMobileDevice = true;
            expectedResults = {
                height: '90%',
                width: '95%',
            };
            expect(getModalSize(isMobileDevice)).toStrictEqual(expectedResults)
        });

        it('should return small modal Size', () => {
            isMobileDevice = false;
            expectedResults = {
                height: '75%',
                width: '70%',
            };
            expect(getModalSize(isMobileDevice)).toStrictEqual(expectedResults)
        });
    });

    describe('modalStyles', () => {
        it('should return default styles when no params passed', () => {
            const actualResults = modalStyles();
            expect(actualResults.content.border).toBe(0);
            expect(actualResults.content.borderRadius).toBe(0);
            expect(actualResults.content.padding).toBe(0);
            expect(actualResults.content.height).toBe(650);
            expect(actualResults.content.width).toBe('40%');
            expect(actualResults.content.color).toBe('black');
            
            expect(actualResults.overlay.backgroundColor).toBe('rgb(120, 119, 119, 0.9)');
            expect(actualResults.overlay.transition).toBe('opacity 2000ms ease-in-out');
        });

        it('should return override content styles when passed', () => {
            const actualResults = modalStyles(getModalSize(true));
            expect(actualResults.content.border).toBe(0);
            expect(actualResults.content.borderRadius).toBe(0);
            expect(actualResults.content.padding).toBe(0);
            expect(actualResults.content.height).toBe('90%');
            expect(actualResults.content.width).toBe('95%');
            expect(actualResults.content.color).toBe('black');
        });

        it('should return override overlay styles when passed', () => {
            const actualResults = modalStyles({}, { backgroundColor: 'black' });
            expect(actualResults.content.border).toBe(0);
            expect(actualResults.content.borderRadius).toBe(0);
            expect(actualResults.content.padding).toBe(0);
            expect(actualResults.content.height).toBe(650);
            expect(actualResults.content.width).toBe('40%');
            expect(actualResults.content.color).toBe('black');
            
            expect(actualResults.overlay.backgroundColor).toBe('black');
            expect(actualResults.overlay.transition).toBe('opacity 2000ms ease-in-out');
        });
    });
});