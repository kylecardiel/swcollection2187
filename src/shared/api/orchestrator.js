import { database } from 'backend/Firebase';
import { isProduction } from 'shared/util/environment';

const envPrefix = isProduction ? '' : 'zzzDevData/' ;  

export const create = (location, record) => {
    const ref = database.ref(`${envPrefix}${location}`);
    ref.push(record);
};

export const read = location => database.ref(location);

export const update = (location, record) => {
    const ref = database.ref(`${location}`);
    ref.update(record);
};

export const deleteRecord = (location, recordId) => {
    const ref = database.ref(`${location}${recordId}`);
    ref.remove();
};