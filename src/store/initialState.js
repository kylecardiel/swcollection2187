export const initialState = {
    dataSet: {
        displayedData: [],
        catalogList: [],
        userList: [],
        displaySettings: {
            actionFigures:{
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
            videoGames: {
                filterByVideoGameConsole: null,
                filterByVideoGameFormat: null,
                filterByVideoGameSeries: null,
                filterByVideoGameType: null,
                filterByYear: null,
                sortingAttribute: null,
            },
        },
    },
    helperDataSet: {},
    screenSize: null,
};