import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';

const useStyles = makeStyles(theme => ({
    deleteButton: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        color: Color.red(),
        backgroundColor: Color.white(),
        '&:hover': {
            backgroundColor: Color.red(),
            color: Color.white(),
        },
    },
    cancelButton: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        color: Color.blue(),
        backgroundColor: Color.white(),
        '&:hover': {
            backgroundColor: Color.blue(),
            color: Color.white(),
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
