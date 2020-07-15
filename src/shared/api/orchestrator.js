import { database } from 'backend/Firebase';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

export class CommonApi {
    
    static create = (location, record) => {
        const ref = database.ref(location)
        ref.push(record);
    };

    static read = (location)  => {
        return database.ref("Action Figures")
    };

    static update = (location, userId, record)  => {
        const ref = database.ref(`${location}${userId}/${record.id}`);
        ref.update(record);
    };

    static delete = (location, userId, recordId)   => {
        const ref = database.ref(`${location}${userId}/${recordId}`);
        ref.remove();
    };
};