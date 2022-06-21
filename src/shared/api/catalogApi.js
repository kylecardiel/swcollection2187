import { create, read, updateRecord } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { CATALOG } = FB_DB_CONSTANTS;

export class CatalogApi {
    static create = (location, record) => create(`${CATALOG}${location}`, record);
    static read = location => read(`${CATALOG}${location}`);
    static update = (location, record, recordId) => updateRecord(`${CATALOG}${location}${recordId}`, record);
}