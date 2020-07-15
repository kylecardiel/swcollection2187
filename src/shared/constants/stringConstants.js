export const STRING_CONSTANTS = Object.freeze({
    HEADER: {
        BUTTONS: {
            LOGIN: 'Login',
            SIGN_UP: 'Sign Up',
            LOGOUT: 'Logout',
            PROFILE: 'Profile',
        },
        AUTH: {
            LOGIN: 'Login',
            SIGN_UP: 'Sign Up',
            LOG_IN: 'Log In',
            FORGOT_PW: 'Forgot password?',
            NO_ACCOUNT: "Don't have an account? Sign Up",
            HAVE_ACCOUNT: 'Already have an account? Sign in',
            PASSWORD_DONT_MATCH: 'Passwords do not match',
            INVALID_EMAIL: 'Invalid Email Address',
            RESET_PASSWORD: 'Reset Password',
            RESET_PASSWORD_LINK: 'Request Reset Link',
            BACK_TO_LOGIN: 'Back to Login?',
            DIVIDER: '───────────── OR ────────────',
            DONT_HAVE_AN_ACCOUNT: "Don't have an account? Sign Up",
            FIELD_LABELS: {
                FIRST_NAME: 'First Name',
                LAST_NAME: 'Last Name',
                EMAIL: 'Email Address',
                PASSWORD: 'Password',
                CONFIRM_PASSWORD: 'Confrim Password',
                REMEMBER_ME: 'Remember me',
            },
        },
    },
    NAVBAR: {
        BUTTONS :{
            HOME: 'Home',
            NEW_TIMESHEET: 'New Timesheet',
            TIMESHEETS: 'Timesheets',
        },
    },
    PAGES: {
        HOME_PAGE: {
            TITLE: 'Home',
            WELCOME: value => `Welcome ${value}!`,
            COACHES: 'Coaches',
            CARDS: {
                TIMESHEET: {
                    TITLE: 'Timesheets',
                    BODY: 'View, Submit, Edit',
                },
                USER_PROFILE: {
                    TITLE: 'User profile',
                    BODY: 'View ...'
                },
                ADMIN: {
                    TITLE: 'Administartion',
                    BODY: 'View, Edit, Create ...'
                },
                REIMBURSEMENT: {
                    TITLE: 'Reimbursement',
                    BODY: 'View, Edit, Create ...'
                },
            },
        },
        VIEW_TIMESHEETS:{
            TITLE: 'View Timesheets',
            BUTTONS:{
                NEW_ENTRY: 'New Entry',
                HIDE_ROWS: 'Hide Approved Timesheets',
                VIEW_ALL_TIMESHEETS: 'View All Approved',
            },
            TABLES: {
                ALL: 'Timesheets',
                APPROVED: 'Approved Timesheets',
                UNAPPROVED: 'Unapproved Timesheets',
            },
        },
        NEW_TIMESHEETS:{
            TITLE: 'New Timesheets',
        },
        VIEW_ALL_TIMESHEETS:{
            TITLE: 'Review All Timesheets',
            TABLES: {
                SUBMITTED: 'All Timesheets Submitted',
            },
        },
        USER_PROFILE:{
            TITLE: 'User Profile',
            SECTION_TITLES: {
                USER: 'User',
                PAY_RATES: 'Pay Rates',
                ROLES: 'Roles',
                LICENSE: 'Coaching License'
            },
            TABLE_COL: {
                TYPE: 'Type',
                RATE: 'Rate',
                PER: 'Per',
                SESSION: '*Session',
                SESSION_DETAILS: '*Session = either a full training or game with the same set of players',
                LEVEL: 'Level',
                DATE: 'Date',
            },
        },
        ADMIN: {
            TITLE: 'Administration',
            CARDS: {
                TS_ALL_COACHES: {
                    TITLE: 'Timesheets',
                    BODY: 'View, Approve ...'
                },
                TS_DATA: {
                    TITLE: 'All Form Data',
                    BODY: 'View, Edit, Create ...'
                },
                ADMIN_EMAILS: {
                    TITLE: 'Admin Access',
                    BODY: 'View and Grant Access'
                },
            },
            TS_DATA_PAGE: {
                TITLE: 'All Form Data',
                BUTTONS: {
                    ADD: 'Add',
                },
            },
            ADMIN_EMAILS_PAGE: {
                TITLE: 'Admin Access',
                BUTTONS: {
                    ADD: 'Grant Access',
                },
                BODY: {
                    WARN: '*Currently you can only grant admin access before that user has signed up',
                },
            },
            USER_PROFILES: {
                TITLE: 'User Profiles',
                PAGE_HEADER: 'All User Profiles',
                TABLE_HEADER: {
                    LAST_NAME: 'Last Name',
                    FIRST_NAME: 'First Name',
                    COACH_ACCESS: 'Coach',
                    SALARIED_COACH: 'Salaried',
                    ADMIN_ACCESS: 'Admin',
                    TECH_ACCESS: 'Tech Admin',
                    RATE_SUPERSTAR: 'SuperStars',
                    RATE_SOCCERSTAR: 'SoccerStars',
                    RATE_CLUBS: 'Club',
                    RATE_COE: 'COE',
                    RATE_TRYOUTS: 'Tryouts',
                    RATE_SUMMER_CAMP: 'SummerCamp',
                    ACTION: 'Action',
                    ACCESS: 'Access',
                    PAY_RATE: 'Pay Rate',
                    LICENSE: 'License',
                    LEVEL: 'Level',
                    LICENSE_DATE: 'Date Obtained',
                },
                UPDATE_PAGE: {
                    TITLE_ROLES: 'Roles',
                    TITLE_RATES: 'Pay Rates',
                    TITLE_LICENSE: 'License Level',
                    LICENSE_LEVEL: 'LicenseLevel',
                    RATES: {
                        RATE_CLUBS_LABEL: 'Club',
                        RATE_COE_LABEL: 'COE',
                        RATE_SOCCERSTAR_LABEL: 'SoccerStars',
                        RATE_SUMMERCAMP_LABEL: 'SummerCamp',
                        RATE_SUPERSTAR_LABEL: 'SuperStars',
                        RATE_TRYOUTS_LABEL: 'Tryouts',
                    },
                    RATE_SUPERSTAR_LABEL: 'SuperStars',
                    RATE_SOCCERSTAR_LABEL: 'SoccerStars',
                    RATE_CLUBS_LABEL: 'Club',
                    RATE_COE_LABEL: 'COE',
                    RATE_SUMMERCAMP_LABEL: 'SummerCamp',
                    RATE_TRYOUTS_LABEL: 'Tryouts',
                    SUBMIT_BUTTON: 'Update',
                    NONE: 'None',
                },
            },
        },

    },
    TIMESHEET: {
        TABLE: {
            COLUMNS: {
                DATE: 'Date',
                PROGRAM: 'Program',
                AGE: 'Age',
                GENDER: 'Gender',
                TEAM: 'Team',
                TYPE: 'Type',
                SESSION_LENGTH: 'Sessions',
                RATE: 'Rate',
                TOTAL: 'Total',
                SUBBED: 'Subbed',
                SUB_COACH: 'Sub Coach',
                COMMENTS: 'Comments', 
                STATUS: 'Status',
                ACTION: 'Action',
                COACH: 'Coach',
            },
        },
        STATUS: {
            NOT_SUBMITTED: 'Not Submitted',
            SUBMITTED: 'Submitted',
            APPROVED: 'Approved',
            DENIED: 'Denied',
        },
        FORM: {
            HEADER: {
                NEW: 'New Timesheet Entry',
                UPDATE: 'Update Timesheet Entry',
            },
            SECTION_TITLES: {
                WHEN: 'When',
                WHO: 'Who - Program/Club',
                HOW: 'How - Session Details',
                WHY: 'Why - Coach Details',
                ADDITIONAL: 'Additional',
            },
            LABELS: {
                DATE: 'Date',
                AGE: 'Age',
                GENDER: 'Gender',
                TEAM: 'Team',
                TYPE: 'Type',
                SESSION_LENGTH: 'Session(s)',
                RATE: 'Rate',
                SUBBED: 'Did you sub for a coach?',
                SUB_COACH: 'Coach subbed for',
                COMMENTS: 'Comments', 
                NONE: 'None',
                VALUE: 'Value'
            },
            BUTTON: {
                SUBMIT: 'Submit',
                UPDATE: 'Update',
            },
            WARNINGS: {
                CANNOT_EDIT_SUBBED_COACH: '*CANNOT edit subbed coach, must delete entry and resubmit new one if needs to change',
                NaN: '*Input must be a number $0.00'
            },
        },
        AUTO: {
            GENERATED_COMMENTS: coach => `Auto-generated when ${coach} subbed for me`,
            GENERATED_USER: 'SYSTEM GENERATED',
        },
    },
    REIMBURSEMENT: {
        TITLE: {
            NEW: 'New Reimbursement',
            EDIT: 'Edit Reimbursement',
        },
        FORM: {
            TEXT: {
                WHEN: 'When did expense occur?',
                WHAT_TYPE: 'What type of expense?',
                WHAT: 'What was the expense?',
                WHERE: 'Where did the expense occur?',
                HOW: 'How much was expense?',
                WHY: 'Why is this an expense?',
            },
            INPUT_LABEL: {
                WHEN: 'Date',
                WHAT_TYPE: 'Expense Type',
                WHAT: 'What...',
                WHERE: 'Seller',
                HOW: 'Purchase Amount',
                WHY: 'Because...',
            },
            BUTTONS: {
                SUBMIT: 'Submit',
                UPDATE: 'Update',
            },
        },
    },
});