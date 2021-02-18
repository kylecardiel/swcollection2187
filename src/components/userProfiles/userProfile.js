import React from 'react';
import { PAGES, USER_PROFILE } from 'shared/constants/stringConstantsSelectors';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import { Color } from 'shared/styles/color';
import { Link } from 'react-router-dom';

const { SECTION_TITLES, TABLE_COL } = USER_PROFILE;
const { BLACK_SERIES, HOME, VIDEO_GAMES } = ROUTE_CONSTANTS;

export const UserProfile = ({ userActionFigureList, userVideoGameList }) => {
    
    const actionFigureCount = Object.keys(userActionFigureList).length;
    const videoGameCount = Object.keys(userVideoGameList).length;
    const totalCount = actionFigureCount + videoGameCount;

    const classes = useStyles();
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const getSectionHeader = header => {
        return <Grid item xs={12} className={classes.categoryHeader}>
            <Typography component='h1' variant='h5'>{header}</Typography>
        </Grid>;
    };

    const collectionTotalHeader = getSectionHeader(SECTION_TITLES.COLLECTION_TOTALS);

    const collectionLinkRow = (type, subType, count, route) => {
        return <TableRow key={type} className={classes.tableRow}>
            <TableCell className={classes.tableCellCenter}>{type}</TableCell>
            <TableCell className={classes.tableCellCenter}>
                <Link
                    to={{ pathname: route, state: { profileOwned: true } }}
                    style={{ textDecoration: 'none' }}
                >
                    {subType}
                </Link>
            </TableCell>
            <TableCell className={classes.tableCellCenter}>{count}</TableCell>
        </TableRow>;
    };

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.USER_PROFILE.TITLE} />
            <Container component='main' maxWidth='lg'>
                <Grid container spacing={1} className={classes.container}>
                    <Grid container spacing={1} className={classes.header}>
                        {collectionTotalHeader}
                        <Grid item xs={12} className={classes.tableContainer}>
                            <Paper>
                                <Table className={classes.table}>
                                    <TableHead className={classes.tableHeaderRow}>
                                        <TableRow>
                                            <TableCell className={classes.tableHeaderCol}>{TABLE_COL.COLLECTION_TYPE}</TableCell>
                                            <TableCell className={classes.tableHeaderCol}>{TABLE_COL.PRODUCT_LINE}</TableCell>
                                            <TableCell className={classes.tableHeaderCol}>{TABLE_COL.COUNT}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {collectionLinkRow('Action Figures', 'Black Series 6"', actionFigureCount, BLACK_SERIES)}
                                        {collectionLinkRow('Video Games', 'All Games', videoGameCount, VIDEO_GAMES)}
                                        <TableRow key={'Total'} className={classes.tableRow}>
                                            <TableCell className={classes.tableCellCenter}>Total</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell className={classes.tableCellCenter}>{totalCount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(3),
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            alignItems: 'center',
        },
        [theme.breakpoints.down('md')]: {
            alignItems: 'left',
        },
        marginTop: theme.spacing(2),
        width: '100%',
    },
    categoryHeader: {
        borderBottom: '3px solid black',
        [theme.breakpoints.up('md')]: {
            width: '75%',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    tableContainer: {
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    table: {
        marginBottom: theme.spacing(2),
    },
    tableHeaderRow: {
        backgroundColor: Color.black(),
    },
    tableHeaderCol: {
        color: Color.darkYellow(),
        textAlign: 'center',
    },
    tableCellCenter: {
        textAlign: 'center',
    },
    tableRow: {
        '&:hover': {
            backgroundColor: Color.lightGrey(),
            cursor: 'pointer',
        },
    },
}));

UserProfile.propTypes = {
    userActionFigureList: PropTypes.object,
    userVideoGameList: PropTypes.object,
};