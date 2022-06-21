import { read } from 'shared/api/orchestrator';
import { database } from 'backend/Firebase';
import { ref } from 'firebase/database';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

const { HELPER_DATA } = FB_DB_CONSTANTS;
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
        const databaseRef = ref(database,`${HELPER_DATA}${dataType}`);
        databaseRef.update(formData);
    };
}