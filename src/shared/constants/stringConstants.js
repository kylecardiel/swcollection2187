export const STRING_CONSTANTS = Object.freeze({
    HEADER: {
        TITLE: '@SW Collector 2187',
        BUTTONS: {
            LOGIN: 'Login',
            SIGN_UP: 'Sign Up',
            LOGOUT: 'Logout',
        },
        AUTH: {
            LOGIN: 'Login',
            SIGN_UP: 'Sign Up',
            LOG_IN: 'LogIn',
            FORGOT_PW: 'Forgot password?',
            NO_ACCOUNT: 'Don\'t have an account? Sign Up',
            HAVE_ACCOUNT: 'Already have an account? Sign in',
            PASSWORD_DONT_MATCH: 'Passwords do not match',
            INVALID_EMAIL: 'Invalid Email Address',
            RESET_PASSWORD: 'Reset Password',
            RESET_PASSWORD_LINK: 'Request Reset Link',
            BACK_TO_LOGIN: 'Back to Login?',
            DIVIDER: '───────────── OR ────────────',
            DONT_HAVE_AN_ACCOUNT: 'Don\'t have an account? Sign Up',
            FIELD_LABELS: {
                EMAIL: 'Email',
                PASSWORD: 'Password',
                CONFIRM_PASSWORD: 'Confrim Password',
                REMEMBER_ME: 'Remember me',
            },
        },
    },
    PAGES: {
        HOME_PAGE: {
            TITLE: 'Home',
            WELCOME: 'Hello There!',
            TAG_LINE: 'Digitally organize your Star Wars Black Series collection!',
            INTRO_PARAGRAPH: [
                'Do you love the Black Series? Do you collect Black Series Figures?',
                'Do you keep track of your collection? Do you want to keep track of your collection?...',
                'Then you\'re in the right spot!',
            ].join('\n'),
            HOW_IT_WORKS: 'How it works',
            GET_STARTED: 'Let\'s get started',
            CARDS: {
                BLACK_SERIES: {
                    TITLE: 'Black Series Catalog',
                    BODY: 'View and add to your collection!',
                },
                USER_PROFILE: {
                    TITLE: 'User profile',
                    BODY: 'View ...',
                },
                ADMIN: {
                    TITLE: 'Administartion',
                    BODY: 'View, Edit, Create ...',
                },
                ABOUT_ME: {
                    TITLE: 'About Me',
                    BODY: 'Learn...',
                },
                STEP_1: {
                    TITLE: 'Step 1',
                    BODY: 'Join the Rebellion [Create an account]',
                },
                STEP_2: {
                    TITLE: 'Step 2',
                    BODY: 'Search for figures by name, year, assortment, movie, etc...',
                },
                STEP_3: {
                    TITLE: 'Step 3',
                    BODY: 'Click "Add to Collection" under figure',
                },
            },
            FOOTER: {
                ABOUT_ME: 'About Me',
                TOS: 'Terms of Service',
                CONTACT: 'Contact Me',
            },
        },
        ABOUT: {
            HEADER: 'About Me',
            HEADER_INTRO: 'Where it all started...',
            INTRO: [
                'I have been a Star Wars fan ever since my I was about 5 years old.' ,
                'My dad "needed" to buy us a SNES and the first game he bought with it was Super Star Wars: The Empire Strikes back.',
                'I had a blast playing the game.',
                'However, I was still reluctant to watch the movies, but a father [occasionally] knows best and he finally sat me down to watch A New Hope.',
                'The rest they say "is history", as I feel in love with it all.',
                'Thus started my collecting of all things Star Wars!',
            ].join('\n'),
            HEADER_WHY: 'Why create this space?',
            WHY: [
                'Having collected for over 25 years now I\'ve amassed a pretty decent collection.',
                'And although I know about 99% of everything I have, there are times I could use some sort of reference so I don\'t buy duplicates.',
                '(Unless I\'m trying to army build, then buy all the duplicate troopers!)',
                'There are a ton of sites that offer an archive/current database list of available collectibles.',
                'However, none of them let me keep track of which of those I own.',
                'Combined that with my career as a software engineer, it only seemed reasonable to fix my own problem and then share with other fans',
            ].join('\n'),
            HEADER_START: 'Starting with The Black Series',
            STARTING: [
                'I decided to start with the Black Series collection.',
                'I enjoy collecting these figures, it\'s an active series and I think they deserve big images to show off how great they look (well most of them).',
                'I plan to venture into the 3 3/4" figures next, once I fix some bugs and add a few more features.',
            ].join('\n'),
            HEADER_SNES: 'First item in my collection',
            HEADER_TBS_COLLECTION: 'My Black Series Collection',
            TBS_COLLECTION: [
                '*Like most collectors (I\'ll assume) I struggle with the choice of opening each figure or not...',
            ].join('\n'),
        },
        BLACK_SERIES_CATALOG: {
            TITLE: 'Black Series Catalog',
            SEARCH: 'Search by name…',
            STAT_TABLE: {
                COLUMNS: ['Source', 'Count', 'Percentage', 'Retail Cost'],
                TOTAL: 'Total',
            },
            BUTTON: {
                STATS: 'Stats',
                RECENT: 'Newly Added',
                ALL: 'View All Again',
            },
            DISPLAY_MODAL: {
                HEADER: 'Filter / Sort / Display',
                BUTTONS: {
                    OUT_OF_BOX: 'Out of Box Image',
                    IN_BOX: 'In Box Image',
                    CLEAR: 'Clear Filters',
                    CLOSE: 'Save & Close',
                },
                LABELS: {
                    FILTER: 'FILTER:',
                    SORT: 'SORT:',
                    DISPLAY: 'DISPLAY:',
                    CHARACTERS: 'Characters',
                    GROUPS: 'Groups',
                    SORTING: 'Sorting',
                    VIEW_ALL: 'View All',
                    OWNED: 'Owned Figures',
                    NOT_OWNED: 'Not Owned Figures',

                },
            },
            CARDS: {
                BUTTONS: {
                    ADD: 'Add to Collection',
                    REMOVE: 'Remove from Collection',
                },
                LABELS: {
                    VERSION: 'Version',
                    TOTAL_OWNED: 'Total Owned',
                },
            },
            ACTION_FIGURE_DETAILS: {
                LABELS: {
                    RELEASE_DETAILS_HEADER: 'Release Details',
                    ASSORTMENT: 'Assortment',
                    WAVE: 'Wave',
                    YEAR: 'Year',
                    MULTIPACK: 'Part of Multipack',
                    EXCLUSIVE_RETAILER: 'Exclusive Retailer',
                    RETAIL_PRICE: 'Retail Price',
                    CHARACTER_DETAILS_HEADER: 'Character Details',
                    SOURCE: 'Source/First Apperance',
                    MORE: (name, count) => `More ${name} Figures: (${count})`,
                    MORE_ASSORTMENT: assortment => `from [${assortment} assortment] `,
                    MULTIPACK_FIGURES: count => `Multipack Figures: (${count})`,
                    COLLECTORS_DETAILS_HEADER: 'Collector Details',
                    NEW_IN_BOX_QUANTITY: 'New in Box Qty',
                    OPEN_COMPLETE_QUANTITY: 'Open (complete) Qty',
                    OPEN_INCOMPLETE_QUANTITY: 'Open (incomplete) Qty',
                    TOTAL_OWNED: 'Total Owned',
                },
            },
        },
        UPLOAD_IMAGE: {
            TITLE: 'Upload Image',
        },
        MY_COLLECTION: {
            TITLE: 'My Collection',
        },
        ADMIN: {
            TITLE: 'Administration',
            IMAGE_FILE_LOCATION: 'File available at:',
            TABLE_DETAILS: 'These tables populate the form inputs:',
            INPUT_VALUE: 'Value',
            BUTTON: {
                ADD: 'Add',
                UPLOAD: 'Upload',
                NEW_ENTRY: 'New Entry',
                HIDE_TABLES: 'Hide Tables',
                DISPLAY_TABLES: 'Display Tables',
            },
            LABELS: {
                DATA_TYPE: 'dataType',
                ASSORTMENT: 'assortment',
            },
            NEW_COLLECTION_FORM: {
                HEADER: 'Feed the Database!',
                LABELS: {
                    COLLECTION_TYPE: { KEY: 'Collection Type', VALUE: 'collectionType' },
                    SERIES: { KEY: 'Series', VALUE: 'series' },
                    ASSORTMENT: { KEY: 'Assortment', VALUE: 'assortment' },
                    VERSIONS: { KEY: 'Versions', VALUE: 'version' },
                    SOURCE_MATERIAL: { KEY: 'Source Material', VALUE: 'sourceMaterial' },
                    EXCLUSIVE_RETAILER: { KEY: 'Exclusive Retailer', VALUE: 'exclusiveRetailer' },
                    SOURCE_TYPE: { KEY: 'Source Type', VALUE: 'sourceType' },
                    NAME: { KEY: 'Name', VALUE: 'name' },
                    ADD_NAME_DETAILS: { KEY: 'Additional Name Details', VALUE: 'additionalNameDetails' },
                    WAVE: { KEY: 'Wave', VALUE: 'wave' },
                    SERIES_NUMBER: { KEY: 'Series Number', VALUE: 'seriesNumber' },
                    YEAR: { KEY: 'Year', VALUE: 'year' },
                    RETAIL_PRICE: { KEY: 'Retail Price', VALUE: 'retailPrice' },
                    MULTIPACK: { KEY: 'Multipack', VALUE: 'multipack' },
                    LOOSE_IMAGE: { KEY: 'Loose Image', VALUE: 'name' },
                    LOOSE_BLACK_IMAGE: { KEY: 'Loose Black Image', VALUE: 'name' },
                    NIB_IMAGE: { KEY: 'NIB Image', VALUE: 'name' },
                },
            },
        },
        CONTACT_ME: {
            TITLE: 'Contact Me',
            SUCCESS: 'Thanks, message recevied!',
            LABELS: {
                FIRST_NAME: 'First Name',
                LAST_NAME: 'Last Name',
                Email: 'Email',
                MESSAGE: 'Message',
            },
        },
        TERMS_OF_SERVICE: {
            TITLE: 'Terms of Service',
        },
    },
    GENERAL: {
        BUTTON: {
            SUBMIT: 'Submit',
        },
        MENU_ITEMS: {
            NONE: 'none',
        },
    },
});