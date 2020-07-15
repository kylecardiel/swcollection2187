import { database } from 'backend/FirebaseDb';

export class CommonApi {
    static create = (userId, location, record) => {
        const ref = database.ref(`${userId}/${location}`)
        ref.push(record);
    };

    static read = (userId, location)  => {
        return database.ref(`${userId}/${location}`)
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