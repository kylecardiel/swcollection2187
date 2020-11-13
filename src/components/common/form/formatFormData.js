export const formatFormData = snapshot => {
    return {
        assortment: createFormDataObj(snapshot.assortment),
        characters: createFormDataObj(snapshot.characters),
        collectionType: createFormDataObj(snapshot.collectionType),
        exclusiveRetailer: createFormDataObj(snapshot.exclusiveRetailer),
        groups: createFormDataObj(snapshot.groups),
        series: createFormDataObj(snapshot.series),
        sourceMaterial: createFormDataObj(snapshot.sourceMaterial),
        sourceType: createFormDataObj(snapshot.sourceType),
        version: createFormDataObj(snapshot.version),
    };
};

const createFormDataObj = retreivedData => {
    let data = {};
    for (let id in retreivedData) {
        data.id = id;
        data.values = retreivedData[id];
    }
    return data;
};

export const convertArrayObjectToArrayOfObjectProperty = (data, attribute) => {
    return data.values.map(obj => obj[attribute]);
};