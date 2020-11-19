import { database } from 'backend/Firebase';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { CATALOG, USERS, HELPER_DATA, STORAGE_REFERENCES, FEATURE_FLAG } = FB_DB_CONSTANTS;

export class CatalogApi {
    static create = (location, record) => CommonApi.create(`${CATALOG}${location}`, record);
    static read = location => CommonApi.read(`${CATALOG}${location}`);
};

export class UserApi {
    static create = (userId, location, record) => CommonApi.create(`${USERS}${userId}/${location}`, record);
    static read = (userId, location) => CommonApi.read(`${USERS}${userId}/${location}`);
    static update = (userId, location, recordId, record) => CommonApi.update(`${USERS}${userId}/${location}${recordId}`, record);
    static delete = (userId, location, recordId) => CommonApi.delete(`${USERS}${userId}/${location}`, recordId);
};

export class HelperDataApi {
    static create = (formData, dataType)  => HelperDataApi.general(formData, dataType);
    static read = () => CommonApi.read(HELPER_DATA);
    static update = (formData, dataType)  => HelperDataApi.general(formData, dataType);
    static delete = (formData, dataType)  => HelperDataApi.general(formData, dataType);

    static createNewCategory = (formData, dataType)  => {
        const ref = database.ref(`${HELPER_DATA}${dataType}`);
        ref.push(formData);
    };

    static general = (formData, dataType) => {
        const ref = database.ref(`${HELPER_DATA}${dataType}`);
        ref.update(formData);
    };
};

export class StorageReferencesApi {
    static create = (location, record) => CommonApi.create(`${STORAGE_REFERENCES}${location}`, record);
    static read = () => CommonApi.read(STORAGE_REFERENCES);
};

export class FeatureFlagApi {
    static read = () => CommonApi.read(FEATURE_FLAG);
};

export class CommonApi {
    static create = (location, record) => {
        const ref = database.ref(location)
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
};