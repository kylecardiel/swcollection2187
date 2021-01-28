import { CommonApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { USERS } = FB_DB_CONSTANTS;

export class UserApi {
    static create = (userId, location, record) => CommonApi.create(`${USERS}${userId}/${location}`, record);
    static read = (userId, location) => CommonApi.read(`${USERS}${userId}/${location}`);
    static update = (userId, location, recordId, record) => CommonApi.update(`${USERS}${userId}/${location}${recordId}`, record);
    static delete = (userId, location, recordId) => CommonApi.delete(`${USERS}${userId}/${location}`, recordId);
}