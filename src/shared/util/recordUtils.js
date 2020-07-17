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

    static mergeTwoArraysByAttribute = (array1, array1Attr, array2, array2Attr) => {
        let merged = [];

        for(let i=0; i<array1.length; i++) {
            merged.push({
                ...array1[i], 
                ...(array2.find((itmInner) => itmInner[array2Attr] === array1[i][array1Attr]))
                });
        };
        return merged;
    };
}