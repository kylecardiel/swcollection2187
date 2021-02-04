import { DateUtils } from 'shared/util/dateUtil';

export class RecordUtils {

    static addTimeStamps = record => {
        const nowTimeStamp = DateUtils.getCurrentTimestamp();
        record.createdDate = nowTimeStamp;
        record.lastModifiedDate = nowTimeStamp;
    };


    static addAuditFields = (record, userName) => {
        if(userName) {
            record.createdBy = userName;
            record.lastModifiedBy = userName;
        }

        RecordUtils.addTimeStamps(record);
    };

    static updateLastModifiedAuditFields = (record, userName) => {
        if(userName) {
            record.lastModifiedBy = userName;
        }
        record.lastModifiedDate = DateUtils.getCurrentTimestamp();
    };

    static convertDBNestedObjectsToArrayOfObjects = (records, idValue) => {
        let recordList =[];
        for (let item in records) {
            let record = records[item];
            record[idValue] = item;
            recordList.push(record);
        }
        return recordList;
    };

    static mergeTwoArraysByAttribute = (array1, array1Attr, array2, array2Attr) => {
        let merged = [];

        for(let i=0; i<array1.length; i++) {
            merged.push({
                ...array1[i], 
                ...(array2.find((itmInner) => itmInner[array2Attr] === array1[i][array1Attr]))
            });
        }
        return merged;
    };
}