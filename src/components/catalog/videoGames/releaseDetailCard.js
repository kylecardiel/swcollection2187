import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { VG_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

export const ReleaseDetailCard = ({ developer, price, otherGamesInSeries, videoGameConsole, videoGameFormat, videoGameSeries, videoGameType, year }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        const adjustedValue = value ? value : 'N/A';
        return <>
            <Divider />
            <div className={classes.detailRow} >
                <Typography variant='body2' color={'textSecondary'} component='p'>
                    <Box fontWeight={'fontWeightRegular'} >
                        {label}
                    </Box>
                </Typography>
                <Typography variant='body2' component='p'>
                    <Box fontWeight={'fontWeightRegular'} >
                        {adjustedValue}
                    </Box>
                </Typography>
            </div>
        </>;
    };


    const generateGroupDetail = () => {
        return <>
            {videoGameConsole.sort().map(g => (
                <Typography variant='body2' gutterBottom component='p' key={g} className={classes.indent}>
                    {`- ${g}`}
                </Typography>
            ))}
        </>;
    };

    const generatSimilarFigureList = () => {
        return <>
            {otherGamesInSeries.map(vg => (
                <Typography variant='body2' gutterBottom component='p' key={vg.name} className={classes.indent}>
                    {`- ${vg.name} `}
                </Typography>
            ))}
        </>;
    };

    const retailPriceFormatted = `$${price}`;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {VG_DETAILS_LABEL.RELEASE_DETAILS_HEADER}
                </Typography>
                {generateDetail(VG_DETAILS_LABEL.TYPE, videoGameType)}
                {generateDetail(VG_DETAILS_LABEL.YEAR, year)}
                {generateDetail(VG_DETAILS_LABEL.DEVELOPER, developer)}
                {generateDetail(VG_DETAILS_LABEL.PRICE, retailPriceFormatted)}
                {generateDetail(VG_DETAILS_LABEL.FORMAT, videoGameFormat)}
                {generateDetail(VG_DETAILS_LABEL.SERIES, videoGameSeries)}
                {otherGamesInSeries && generatSimilarFigureList()}
                {generateDetail(VG_DETAILS_LABEL.CONSOLE, videoGameConsole.length)}
                {videoGameConsole.length > 0 && generateGroupDetail()}
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    detailRowWithColor: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: props => Color.primary(props.assortmentBackgroundColor),
    },
}));

ReleaseDetailCard.propTypes = {
    developer: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    otherGamesInSeries: PropTypes.array.isRequired,
    videoGameConsole: PropTypes.array.isRequired,
    videoGameFormat: PropTypes.string.isRequired,
    videoGameSeries: PropTypes.string.isRequired,
    videoGameType: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};
