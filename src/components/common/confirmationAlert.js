import Button from '@material-ui/core/Button';
import React from 'react';
import { Color } from 'shared/styles/color';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    deleteButton: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        color: Color.primary('eliteRed'),
        backgroundColor: Color.primary('white'),
        '&:hover': {
            backgroundColor: Color.primary('eliteRed'),
            color: Color.primary('white'),
        },
    },
    cancelButton: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        color: Color.primary('blue'),
        backgroundColor: Color.primary('white'),
        '&:hover': {
            backgroundColor: Color.primary('blue'),
            color: Color.primary('white'),
        },
    },
}));

export const ConfirmationAlert = props => {
    const classes = useStyles();

    const { open, onClose, onDelete } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {'You will not be able to revert this.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    autoFocus
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.cancelButton}
                >
                    {'No Mistake!'}
                </Button>
                <Button
                    onClick={onDelete}
                    autoFocus
                    fullWidth
                    variant='contained'
                    className={classes.deleteButton}
                >
                    {'Yes Delete!'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
