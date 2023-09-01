import { read } from 'shared/api/orchestrator';
import { database } from 'backend/Firebase';
import { ref, update } from 'firebase/database';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { isProduction } from 'shared/util/environment';

const { HELPER_DATA } = FB_DB_CONSTANTS;

const envPrefix = isProduction ? '' : 'zzzDevData/' ;  

export class HelperDataApi {
    static create = (formData, dataType)  => HelperDataApi.general(formData, dataType);
    static read = () => read(HELPER_DATA);
    static update = (formData, dataType)  => HelperDataApi.general(formData, dataType);
    static delete = (formData, dataType)  => HelperDataApi.general(formData, dataType);

    static createNewCategory = (formData, dataType)  => {
        const databaseRef = ref(database,`${HELPER_DATA}${dataType}`);
        databaseRef.push(formData);
    };

    static general = (formData, dataType) => {
        const databaseRef = ref(database,`${envPrefix}${HELPER_DATA}${dataType}`);
        update(databaseRef, formData);
    };
}