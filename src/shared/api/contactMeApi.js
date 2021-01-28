import { CommonApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { CONTACT_ME } = FB_DB_CONSTANTS;

export class ContactMeApi {
    static create = record => CommonApi.create(CONTACT_ME, record);
}