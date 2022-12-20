import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ContactMeApi } from 'shared/api/contactMeApi';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import ContactMeFile from 'shared/fixtures/contactMe.json';
import { DateUtils } from 'shared/util/dateUtil';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { onValue } from 'firebase/database';

const { ContactMe } = ContactMeFile;
const { HOME, ADMIN } = ROUTE_CONSTANTS;

export const ReadContactMe = ({ contactMeData, setContactMeData }) => {
    const classes = useStyles();
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
        {
            route: ADMIN,
            title: PAGES.ADMIN.TITLE,
        },
    ];

    useEffect(() => {
        
        if(isProduction) {
            const catalogRef = ContactMeApi.read();
            onValue(catalogRef, snapshot => {
                const snapshotValue = snapshot.val();
                if (snapshotValue) {
                    setContactMeData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshotValue, 'id'));
                }
            });

        } else {
            setContactMeData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(ContactMe, 'id'));
        }

    }, [setContactMeData]);

    const generateHowToRow = text => {
        return <div key={text}>
            <Divider/>
            <Grid 
                item xs={12} 
                container 
                direction='row' 
                justifyContent='space-between' 
                className={classes.row} 
                
            >
                <Typography variant='body2' component='span' className={classes.text}>
                    <Box fontWeight='fontWeightBold'>
                        {text}
                    </Box>
                </Typography>
            </Grid>
        </div>;
    };

    const buildMessageString = message => {
        return `[${message.email}](${DateUtils.formatTimestamp(message.createdDate)}): ${message.message} `;
    };

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.READ_CONTACT_ME.TITLE} />
            <Container component='main' maxWidth='md' className={classes.container}>
                <Grid container direction='column'>
                    <Grid item xs={12} container direction='row' justifyContent='center'>
                        <h3>{PAGES.READ_CONTACT_ME.TITLE}</h3>
                    </Grid>
                    {contactMeData.map(c => generateHowToRow(buildMessageString(c)))}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

ReadContactMe.propTypes = {
    contactMeData: PropTypes.array.isRequired,
    setContactMeData: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
    },
    row:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
    },
    text: {
        paddingTop: theme.spacing(.5),
    },
}));
