export const STRING_CONSTANTS = Object.freeze({
    HEADER: {
        TITLE: '@SW Collector 2187',
        BUTTONS: {
            LOGIN: 'Login',
            SIGN_UP: 'Sign Up',
            LOGOUT: 'Logout',
            PROFILE: 'Profile',
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
            },
        },
        BLACK_SERIES_CATALOG: {
            TITLE: 'Black Series Catalog',
            SEARCH: 'Search…',
            STAT_TABLE: {
                COLUMNS: ['Source', 'Count', 'Percentage', 'Retail Cost'],
                TOTAL: 'Total',
            },
            BUTTON: {
                STATS: 'Stats',
            },
            DISPLAY_MODAL: {
                HEADER: 'Filter / Sort / Display',
                BUTTONS: {
                    OUT_OF_BOX: 'Out of Box Image',
                    IN_BOX: 'In Box Image',
                    CLEAR: 'Clear Filters',
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