import { CommonApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { STORAGE_REFERENCES } = FB_DB_CONSTANTS;

export class StorageReferencesApi {
    static create = (location, record) => CommonApi.create(`${STORAGE_REFERENCES}${location}`, record);
    static read = () => CommonApi.read(STORAGE_REFERENCES);
}