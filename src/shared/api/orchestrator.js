import { database } from 'backend/FirebaseDb';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';


const { CATALOG, USERS } = FB_DB_CONSTANTS;

export class CatalogApi {
    static create = (location, record) => CommonApi.create(`${CATALOG}${location}`, record);
    static read = location => CommonApi.read(`${CATALOG}${location}`);
}

export class UserApi {
    static create = (userId, location, record) => CommonApi.create(`${USERS}${userId}/${location}`, record);
    static read = (userId, location) => CommonApi.read(`${USERS}${userId}/${location}`);

    static delete = (userId, location, recordId) => CommonApi.delete(`${USERS}${userId}/${location}`, recordId);
}

export class CommonApi {
    static create = (location, record) => {
        const ref = database.ref(location)
        ref.push(record);
    };

    static read = location  => database.ref(location);

    static update = (location, userId, record)  => {
        const ref = database.ref(`${location}${userId}/${record.id}`);
        ref.update(record);
    };

    static delete = (location, recordId)   => {
        const ref = database.ref(`${location}${recordId}`);
        ref.remove();
    };
};