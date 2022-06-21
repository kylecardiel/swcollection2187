import { database } from 'backend/Firebase';
import { ref } from 'firebase/database';
import { isProduction } from 'shared/util/environment';

const envPrefix = isProduction ? '' : 'zzzDevData/' ;  

export const create = (location, record) => {
    const databaseRef = ref(database, `${envPrefix}${location}`);
    databaseRef.push(record);
};

export const read = location => ref(database, location);

export const update = (location, record) => {
    const databaseRef = ref(database, `${location}`);
    databaseRef.update(record);
};

export const deleteRecord = (location, recordId) => {
    const databaseRef = ref(database, `${location}${recordId}`);
    databaseRef.remove();
};