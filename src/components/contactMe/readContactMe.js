import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { isProduction } from 'shared/util/environment';
import { ContactMeApi } from 'shared/api/contactMeApi';
import { RecordUtils } from 'shared/util/recordUtils';
import { ContactMe } from 'shared/fixtures/contactMe';
import { DateUtils } from 'shared/util/dateUtil';

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
            catalogRef.once('value').then((snapshot) => {
                if (snapshot.val()) {
                    let records = snapshot.val();
                    setContactMeData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'id'));
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
                justify='space-between' 
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
                    <Grid item xs={12} container direction='row' justify='center'>
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
