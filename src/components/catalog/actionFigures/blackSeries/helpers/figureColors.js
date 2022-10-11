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

export const assortmentBackgroundColor = (figure, sourceMaterials, assortments) => {
    const isSeries4 = figure.packageType.includes('Box w/Mural');
    let color = '';
    if (isSeries4) {
        const sourceMaterialColors = getSourceColor(sourceMaterials, figure.sourceMaterial);
        color = sourceMaterialColors.backgroundColor;
    } else {
        const assortmentColors = getAssortmentColor(assortments, figure.assortment);
        color = assortmentColors.backgroundColor;
    }
    return color;
};