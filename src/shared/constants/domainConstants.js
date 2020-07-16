export const DOMAIN_CONSTANTS = Object.freeze({
    SOURCE: {
        MOVIES: {
            TPM: {
                NAME: 'The Phantom Menace',
                EPISODE: 'I',
                SHORTHAND: 'TPM',
            },
            AOTC: {
                NAME: 'Attack of the Clones',
                EPISODE: 'II',
                SHORTHAND: 'AOTC',
            },
            ROTS: {
                NAME: 'Revenge of the Sith',
                EPISODE: 'III',
                SHORTHAND: 'ROTS',
            },
            ANH: {
                NAME: 'A New Hope',
                EPISODE: 'IV',
                SHORTHAND: 'ANH',
            },
            ESB: {
                NAME: 'The Empire Strikes Back',
                EPISODE: 'V',
                SHORTHAND: 'ESB',
            },
            ROTJ: {
                NAME: 'Return of the Jedi',
                EPISODE: 'VI',
                SHORTHAND: 'ROTJ',
            },
            TFA: {
                NAME: 'The Force Awakens',
                EPISODE: 'VII',
                SHORTHAND: 'TFA',
            },
            TLJ: {
                NAME: 'The Last Jedi',
                EPISODE: 'VIII',
                SHORTHAND: 'TLJ',
            },
            TROS: {
                NAME: 'The Rise of Skywalker',
                EPISODE: 'IX',
                SHORTHAND: 'TROS',
            },
            RO: {
                NAME: 'Rogue One',
                EPISODE: '',
                SHORTHAND: 'RO',
            },
            SOLO: {
                NAME: 'Solo',
                EPISODE: '',
                SHORTHAND: 'SOLO',
            },
        },
        TV_SHOWS: {
            CLONE_WARS: 'Clone Wars',
            REBELS: 'Rebels',
            RESISTANCE: 'Resistance',
            MANDALORIAN: 'The Mandalorian',
        },
        VIDEO_GAME: {
            BATTLEFRONT_II: 'BattleFront II',
            JEDI_FALLEN_ORDER: 'Jedi Fallen Order',
        },
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
    GROUPS: {
        ALIENS: 'Aliens',
        BOUNTY_HUNTERS: 'Bounty Hunters',
        DRIODS: 'Droids',
        EMPIRE: 'Empire',
        FIRST_ORDER: 'First Order',
        HUMANS: 'Humans',
        JEDI: 'Jedi',
        JEDI_COUNSEL: 'Jedi Counsel',
        LEGENDS: 'Legends',
        OFFICERS: 'Officers',
        ORIGINAL: 'Originals',
        PIOLTS: 'Pilots',
        PREQUELS: 'Prequels',
        REBELS: 'Rebels',
        REPUBLIC: 'Republic',
        RESISTANCE: 'Resistance',
        SEQUELS: 'Sequels',
        SITH: 'Sith',
        TRADE_FEDERATION: 'Trade Federation',
        TROOPERS: 'Troopers', 
    },
    VERSIONS: {
        CARBONIZED: 'Carbonized',
        FIRST_EDITION: 'White Box',
        REGULAR: 'Regular',
    },
    CHARATERS: {
        CHEWBACCA: 'Chewbacca',
        VADER: 'Darth Vader',
        FINN: 'Finn',
        HAN: 'Han Solo',
        KYLO: 'Kylo Ren',
        LEIA: 'Leia Organa',
        LUKE: 'Luke Skywalker',
        OBIWAN: 'Obi-Wan Kenobi',
        POE: 'Poe Dameron',
        REY: 'Rey',
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