import { DateUtils } from 'shared/util/dateUtil';

export class RecordUtils {

    static addAuditFields = (record, userName) => {
        const nowTimeStamp = DateUtils.getCurrentTimestamp();
        record.createdBy = userName;
        record.createdDate = nowTimeStamp
        record.lastModifiedBy = userName;
        record.lastModifiedDate = nowTimeStamp;
    };

    static updateLastModifiedAuditFields = (record, userName) => {
        record.lastModifiedBy = userName;
        record.lastModifiedDate = DateUtils.getCurrentTimestamp();
    };

    static convertDBNestedObjectsToArrayOfObjects = records => {
        let recordList =[]
        for (let item in records) {
            let record = records[item];
            record.id = item;
            recordList.push(record)
        };
        return recordList;
    };
}