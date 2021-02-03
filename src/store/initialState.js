export const initialState = {
    dataSet: {
        displayedData: [],
        catalogList: [],
        userList: [],
        displaySettings: {
            filterBySourceMaterial: null,
            filterByCharacter: null,
            filterByInputName: null,
            filterByGroup: null,
            filterByVersion: null,
            filterByAssortment: null,
            filterByYear: null,
            newBoxImage: undefined,
            sortingAttribute: null,
            viewAllFigures: true,
            viewOnlyOwnedFigures: false,
            viewOnlyUnownedFigures: false,
        },
    },
    helperDataSet: {},
    screenSize: null,
};