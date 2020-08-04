export const DOMAIN_CONSTANTS = Object.freeze({
    SOURCE: {
        MOVIE_SETS: [
            '1990 VHS Release',
            '1997 Special Edition',
            '2004 DVD Release',
            '2006 DVD Re-Release',
            '2011 Complete Saga Blu-Ray',
        ],
        MOVIE_MEDIA_FORMATS: {
            VHS: 'VHS',
            DVD: 'DVD',
            BLURAY: 'Blu-Ray',
            DIGITAL: 'Digital HD',
        },
    },
    PRODUCT:{
        LINES: {
            ACTION_FIGURES: {
                ALL: {
                    NAME: 'All',
                    ASSORMENTS: {},
                },
                BLACK_SERIES_6: {
                    NAME: 'Black Series 6',
                    ASSORMENTS: {
                        BS_ORANGE: 'Orange - 2013/2014',
                        BS_BLUE: 'Blue - 2014/2015',
                        BS_RED: 'Red - 2015-2020',
                        BS_ARCHIVE: 'Archive',
                        BS_CENTERPIECE: 'Centerpiece',
                        BS_DELUX: 'Red - Delux',
                        BS_VEHICLE: 'With Vehicle',
                        BS_40TH: '40th Anniv',
                        BS_GAMING_GREATS: 'Gaming Greats',
                        BS_RED_EXCLUSIVES: 'Red - Exclusives',
                    },
                },
                ELITE_SERIES: {
                    NAME: 'Elite Series',
                    ASSORMENTS: {
                        BASIC_2015_16: 'Basic Assortment 2015/2016',
                        BASIC_2016_17: 'Basic Assortment 2016/2017',
                        BASIC_2016_17_MULTIPACK: 'Multipacks 2016/2017',
                        BASIC_2017_18: 'Basic Assortment 2017/2018',
                    },
                },
            },
            VEHICLES: {
                ACTION_FLEET: {
                    NAME: 'Action Fleet',
                    ASSORMENTS: {
                        BASIC_1995_98: 'Action Fleet 1995-98',
                        BATTLE_PACKS: 'Battle Packs',
                        TRANSFORMING_PLAYSET: 'Transforming Playsets',
                    },
                },
            },
        },
        VIDEO_GAMES: {
            SYSTEMS: {
                INTELLIVISION: 'Intellivision',
                NES: 'Nintendo',
                SNES: 'Super Nintendo',
                N64: 'Nintendo 64',
                GC: 'GameCube',
                WII: 'Wii',
                PS: 'Playstation',
                PS2: 'Playstation 2',
                PS3: 'Playstation 3',
                PS4: 'Playstation 4',
                PC: 'PC',
                MAC: 'Mac',
            },
        },
        TYPE: {
            ALL: 'ALL',
            ACTION_FIGURES: 'Action Figures',
            // 'Board Games',
            // 'Books',
            // 'Helmets',
            MOVIES: 'Movies',
            LEGOS: 'LEGOS',
            // 'Ornaments',
            // 'Posters',
            // 'Prints',
            // 'Board Games/Puzzles',
            // 'TV Shows',
            VEHICLES: 'Vehicles',
            VIDEO_GAMES: 'Video Games',
        },
    },
});