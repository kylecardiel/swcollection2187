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
            WELCOME: value => `Welcome ${value}!`,
            CARDS: {
                BLACK_SERIES: {
                    TITLE: 'Black Series Catalog',
                    BODY: 'View and add to your collection!',
                },
                USER_PROFILE: {
                    TITLE: 'User profile',
                    BODY: 'View ...'
                },
                ADMIN: {
                    TITLE: 'Administartion',
                    BODY: 'View, Edit, Create ...'
                },
            },
        },
        BLACK_SERIES_CATALOG:{
            TITLE: 'Black Series Catalog',
        },
        UPLOAD_IMAGE: {
            TITLE: 'Upload Image',
        },
        MY_COLLECTION: {
            TITLE: 'My Collection',
        },
        ADMIN: {
            TITLE: 'Administration',
        },
    },
});