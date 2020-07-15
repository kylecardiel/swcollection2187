import { DateUtils } from 'shared/util/dateUtil';
import moment from 'moment';

describe('DateUtils', () => {

    const DEFAULT_FORMAT = 'MMM DD, YYYY HH:mm:ss';

    describe('getCurrentTimestamp', () => {
        it('should getCurrentTimestamp with correct format when none is passed', () => {
            const checked_date = DateUtils.getCurrentTimestamp();
            expect(checked_date).toBe(moment(checked_date, DEFAULT_FORMAT).format(DEFAULT_FORMAT))
        });    
    });

    describe('formatDateFromInput', () => {
        it('should format date correctly', () => {
            const test_date = moment('Fri May 29 2020 20:35:00 GMT-0500');
            const checked_date = DateUtils.formatDateFromInput(test_date);
            expect(checked_date).toBe('2020-05-29')
        });    
    });

    describe('formatDateToInput', () => {
        it('should format date correctly', () => {
            const test_date = moment('2020-05-29');
            const checked_date = DateUtils.formatDateToInput(test_date);
            expect(checked_date).toBe('Fri May 29 2020 00:00:00')
        });    
    });

    describe('formatDateFromFB', () => {
        it('should format date correctly', () => {
            const test_date = moment('2020-05-29');
            const checked_date = DateUtils.formatDateFromFB(test_date);
            expect(checked_date).toBe('Fri May 29, 2020')
        });    
    });


});