import { CommonApi } from 'shared/api/orchestrator';
import { database } from 'backend/Firebase';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { HELPER_DATA } = FB_DB_CONSTANTS;


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
}