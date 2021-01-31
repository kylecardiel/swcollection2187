import { create } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { CONTACT_ME } = FB_DB_CONSTANTS;

export class ContactMeApi {
    static create = record => create(CONTACT_ME, record);
}