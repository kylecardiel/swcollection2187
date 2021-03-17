import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'shared/styles/color';

export const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.up('md')]: {
            width: '60%',
            boxShadow: '0 2px 2px 2px rgba(0,0,0,0.2)',
            borderRadius: 5,
            border: '1px solid',
            borderColor: Color.lightGrey(),
            marginTop: theme.spacing(8),
            padding: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            boxShadow: 'none',
            marginTop: theme.spacing(5),
        },
    },
    google: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.dark,
    },
    form: {
        maxWidth: 375,
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    recaptchaContainer: {
        marginTop: theme.spacing(2),
    },
}));
