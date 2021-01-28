import { database } from 'backend/Firebase';
export class CommonApi {
    static create = (location, record) => {
        const ref = database.ref(location);
        ref.push(record);
    };

    static read = location  => database.ref(location);

    static update = (location, record)  => {
        const ref = database.ref(`${location}`);
        ref.update(record);
    };

    static delete = (location, recordId)   => {
        const ref = database.ref(`${location}${recordId}`);
        ref.remove();
    };
}