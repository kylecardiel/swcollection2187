import { database } from 'backend/FirebaseDb';

export class CommonApi {
    
    static create = (location, record) => {
        const ref = database.ref(location)
        ref.push(record);
    };

    static read = (location)  => {
        return database.ref(location)
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