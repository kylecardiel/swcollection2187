export const getSourceColor = (sourceMaterials, source) => {
    return {
        backgroundColor: sourceMaterials.filter(s => s.name === source)[0].color,
        textColor: 'black',
    };
};

export const getAssortmentColor = (assortments, assort) => {
    return {
        backgroundColor: assortments.filter(s => s.name === assort)[0].color,
        textColor: 'black',
    };
};
