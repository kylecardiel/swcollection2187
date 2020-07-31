export const formatFormData = snapshot => {
    const collectionTypeData = createFormDataObj(snapshot.collectionType);
    const sourceMaterialData = createFormDataObj(snapshot.sourceMaterial);
    const sourceTypeData = createFormDataObj(snapshot.sourceType);
    const seriesData = createFormDataObj(snapshot.series);
    const versionData = createFormDataObj(snapshot.version);
    const assortmentData = createFormDataObj(snapshot.assortment);
    const groupsData = createFormDataObj(snapshot.groups);

    let formatFormData = {
        assortment: assortmentData,
        collectionType: collectionTypeData,
        groups: groupsData,
        series: seriesData,
        sourceMaterial: sourceMaterialData,
        sourceType: sourceTypeData,
        version: versionData,
    };
    return formatFormData;
};

const createFormDataObj = retreivedData => {
    let data = {};
    for (let id in retreivedData) {
        data.id = id;
        data.values = retreivedData[id];
    };
    return data;
};