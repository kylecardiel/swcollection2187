import { CommonApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { CATALOG } = FB_DB_CONSTANTS;

export class CatalogApi {
    static create = (location, record) => CommonApi.create(`${CATALOG}${location}`, record);
    static read = location => CommonApi.read(`${CATALOG}${location}`);
    static update = (location, record, recordId) => CommonApi.update(`${CATALOG}${location}${recordId}`, record);
}