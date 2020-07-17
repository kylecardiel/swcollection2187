import { database } from 'backend/FirebaseDb';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';


const { CATALOG, USERS } = FB_DB_CONSTANTS;

export class CatalogApi {
    static read = location => CommonApi.read(`${CATALOG}${location}`);
}

export class UserApi {
    static read = (userId, location) => CommonApi.read(`${USERS}${userId}/${location}`);
}

export class CommonApi {
    static create = (userId, location, record) => {
        const ref = database.ref(`${userId}/${location}`)
        ref.push(record);
    };

    static read = location  => {
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