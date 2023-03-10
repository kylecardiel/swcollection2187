export const initialVideoGameFilter = {
    search: null,
    videoGameConsole: null,
    videoGameFormat: null,
    videoGameSeries: null,
    videoGameType: null,
    year: null,
    sorting: null,
};

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
            videoGames: initialVideoGameFilter,
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