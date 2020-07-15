import { RecordUtils } from 'shared/util/recordUtils';
import { DateUtils } from 'shared/util/dateUtil';
import moment from 'moment';

describe('RecordUtils', () => {

    describe('.addAuditFields', () => {
        it('should tag the record object with correct fields', () => {
            const today = DateUtils.getCurrentTimestamp('YYYY-MM-DD');
            let record = {
                name: 'test',
                why: 'need to test'
            };
            const userName = 'Test Name';
            RecordUtils.addAuditFields(record, userName);
            expect(record.createdBy).toBe(userName);
            expect(moment(record.createdDate, 'MMM DD, YYYY HH:mm:ss').format('YYYY-MM-DD')).toBe(today);
            expect(record.lastModifiedBy).toBe(userName);
            expect(moment(record.lastModifiedDate, 'MMM DD, YYYY HH:mm:ss').format('YYYY-MM-DD')).toBe(today);
        });
    });

    describe('.updateLastModifiedAuditFields', () => {
        it('should tag the record object with correct fields', () => {
            const today = DateUtils.getCurrentTimestamp('YYYY-MM-DD');
            let record = {
                name: 'test',
                why: 'need to test',
                lastModifiedBy: 'First User',
                lastModifiedByDate: 'some time'
            };
            const userName = 'Second User';
            RecordUtils.updateLastModifiedAuditFields(record, userName);
            expect(record.lastModifiedBy).toBe(userName);
            expect(moment(record.lastModifiedDate, 'MMM DD, YYYY HH:mm:ss').format('YYYY-MM-DD')).toBe(today);
        });
    });

    describe('.convertDBNestedObjectsToArrayOfObjects', () => {
        it('should convert the object from firebase to an array', () => {
           const records = {
            "M7OoZaXA4BtpTu-G": {
                name: 'test1',
                userId: '1'
            },
            "M7OoZdsafdsA4BtartG": {
                name: 'test2',
                userId: '2'
            }
           };
           
           const expectedResults = [
            {
                name: 'test1',
                userId: '1',
                id: "M7OoZaXA4BtpTu-G"
            },
            {
                name: 'test2',
                userId: '2',
                id: "M7OoZdsafdsA4BtartG"
            }
           ];

           const actualResults = RecordUtils.convertDBNestedObjectsToArrayOfObjects(records);
           expect(actualResults).toStrictEqual(expectedResults)
        });
    });

});