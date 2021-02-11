import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DetailRow } from 'components/catalog/common/cards/rows/detailRow';
import { ListDetailRow } from 'components/catalog/common/cards/rows/listDetailRow';
import PropTypes from 'prop-types';
import React from 'react';
import { VG_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';

export const ReleaseDetailCard = ({ developer, price, otherGamesInSeries, videoGameConsole, videoGameFormat, videoGameSeries, videoGameType, year }) => {
    const classes = useStyles();
    
    const generatSimilarFigureList = () => {
        return <>
            {otherGamesInSeries.map(vg => (
                <Typography variant='body2' gutterBottom component='p' key={`${vg.name}-${vg.year}`}>
                    {`- ${vg.name} (${vg.year})`}
                </Typography>
            ))}
        </>;
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {VG_DETAILS_LABEL.RELEASE_DETAILS_HEADER}
                </Typography>
                <DetailRow label={VG_DETAILS_LABEL.TYPE} value={videoGameType}/>
                <DetailRow label={VG_DETAILS_LABEL.YEAR} value={year}/>
                <DetailRow label={VG_DETAILS_LABEL.DEVELOPER} value={developer}/>
                <DetailRow label={VG_DETAILS_LABEL.PRICE} value={`$${price}`}/>
                <DetailRow label={VG_DETAILS_LABEL.FORMAT} value={videoGameFormat}/>
                <DetailRow label={VG_DETAILS_LABEL.SERIES} value={videoGameSeries}/>
                {otherGamesInSeries && generatSimilarFigureList()}
                <DetailRow label={VG_DETAILS_LABEL.CONSOLE} value={videoGameConsole.length}/>
                {videoGameConsole.length > 0 && <ListDetailRow list={videoGameConsole}/>}
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
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
