import { create, read, update, deleteRecord } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { USERS } = FB_DB_CONSTANTS;

export class UserApi {
    static create = (userId, location, record) => create(`${USERS}${userId}/${location}`, record);
    static read = (userId, location) => read(`${USERS}${userId}/${location}`);
    static update = (userId, location, recordId, record) => update(`${USERS}${userId}/${location}${recordId}`, record);
    static delete = (userId, location, recordId) => deleteRecord(`${USERS}${userId}/${location}`, recordId);
}