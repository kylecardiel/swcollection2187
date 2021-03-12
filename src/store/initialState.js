export const initialState = {
    dataSet: {
        catalogList: {
            actionFigures: [],
            videoGames: [],
        },
        contactMe: [],
        displayedData: [],
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
        userList: {
            actionFigures: [],
            videoGames: [],
        },
    },
    helperDataSet: {},
    screenSize: null,
    aboutMe: null,
};