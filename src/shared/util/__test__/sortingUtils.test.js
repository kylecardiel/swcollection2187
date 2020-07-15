import { SortingUtils } from 'shared/util/sortingUtil';


describe('SortingUtils', () => {

    const sampleEntries = [
        { name: 'mother', date: '1957-06-19' },
        { name: 'daughter', date: '1988-04-20' },
        { name: 'father', date: '1955-04-24' },
        { name: 'son', date: '1988-04-18' },
    ];

    describe('.TimesheetEntriesByDateDesc', () => {
        it('should sort array of objects by date attributes descending', () => {
            const expectedResults = [
                { name: 'daughter', date: '1988-04-20' },
                { name: 'son', date: '1988-04-18' },
                { name: 'mother', date: '1957-06-19' },
                { name: 'father', date: '1955-04-24' },
            ];

            const acuatlResults = SortingUtils.TimesheetEntriesByDateDesc(sampleEntries);
            expect(acuatlResults).toStrictEqual(expectedResults);
        });
    });

    describe('.sortDataByAttributeDesc', () => {
        it('should sort array of objects by attributes descending', () => {
            const expectedResults = [
                { name: 'son', date: '1988-04-18' },
                { name: 'mother', date: '1957-06-19' },
                { name: 'father', date: '1955-04-24' },
                { name: 'daughter', date: '1988-04-20' },
            ];

            const acuatlResults = SortingUtils.sortDataByAttributeDesc(sampleEntries, 'name');
            expect(acuatlResults).toStrictEqual(expectedResults);
        });
    });

    describe('.sortDataByAttributeAsc', () => {
        it('should sort array of objects by attributes ascending', () => {
            const expectedResults = [                
                { name: 'daughter', date: '1988-04-20' },
                { name: 'father', date: '1955-04-24' },
                { name: 'mother', date: '1957-06-19' },
                { name: 'son', date: '1988-04-18' },
            ];

            const acuatlResults = SortingUtils.sortDataByAttributeAsc(sampleEntries, 'name');
            expect(acuatlResults).toStrictEqual(expectedResults);
        });
    });

    describe('.alphaNumericSorting', () => {
        const elementOne = 'U9';
        const elementTwo = 'U12';
        it('should sort alphaNumericSorting', () => {
            const acuatlResults = SortingUtils.alphaNumericSorting(elementOne, elementTwo);
            expect(acuatlResults).toBeLessThan(0);
        });

        it('should sort alphaNumericSorting', () => {
            const acuatlResults = SortingUtils.alphaNumericSorting(elementTwo, elementOne);
            expect(acuatlResults).toBeGreaterThan(0);
        });

        it('should sort alphaNumericSorting', () => {
            const acuatlResults = SortingUtils.alphaNumericSorting(elementOne, elementOne);
            expect(acuatlResults).toBeNaN();
        });
    });


});