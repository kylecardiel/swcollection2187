import { database } from 'backend/Firebase';
import { ref, push, update, remove } from 'firebase/database';
import { isProduction } from 'shared/util/environment';

const envPrefix = isProduction ? '' : 'zzzDevData/' ;  

export const create = (location, record) => {
    const databaseRef = ref(database, `${envPrefix}${location}`);
    push(databaseRef, record);
};

export const read = location => ref(database, location);

export const updateRecord = (location, record) => {
    const databaseRef = ref(database, `${envPrefix}${location}`);
    update(databaseRef, record);
};

export const deleteRecord = (location, recordId) => {
    const databaseRef = ref(database, `${location}${recordId}`);
    remove(databaseRef);
};