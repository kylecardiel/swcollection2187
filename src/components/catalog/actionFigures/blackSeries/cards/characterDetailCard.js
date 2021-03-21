import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import { slugify } from 'shared/util/stringUtil';

export const CharacterDetailCard = ({ groups, multipack, multipackFigures, name, similarFigures, sourceMaterial, sourceType }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        const adjustedValue = value ? value : 'N/A';
        return <>
            <Divider />
            <div className={classes.detailRow}>
                <Typography variant='body2' color='textSecondary' component='span'>
                    {label}
                </Typography>
                <Typography variant='body2' component='span'>
                    <Box fontWeight='fontWeightBold'>
                        {adjustedValue}
                    </Box>
                </Typography>
            </div>
        </>;
    };

    const generatSimilarFigureList = () => {
        return <>
            {similarFigures.map(f => (
                <Link
                    to={{
                        pathname: `${ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES}/${slugify([
                            f.assortment,
                            f.name,
                            f.additionalNameDetails,
                        ])}`,
                        state: { id: f.id },
                    }}
                    style={{ textDecoration: 'none' }}
                    key={`${f.additionalNameDetails}-${f.assortment}-${f.sourceMaterial}`}
                >
                    <Typography variant='body2' gutterBottom component='p' >
                        {`- ${f.name} `}
                        {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                        {BS_DETAILS_LABEL.MORE_ASSORTMENT(f.assortment)}
                        {f.version && `[${f.version}]`}
                    </Typography>
                </Link>
            ))}
        </>;
    };

    const generatMulitpackFigureList = () => {
        return <>
            {multipackFigures.map(f => (
                <Typography variant='body2' gutterBottom component='p' key={`${f.additionalNameDetails}-${f.assortment}`}>
                    {`${f.name} `}
                    {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                    {`[${f.multipack}]`}
                </Typography>
            ))}
        </>;
    };

    const generateGroupDetail = () => {
        return <>
            {groups.sort().map(g => (
                <Typography variant='body2' gutterBottom component='p' key={g} className={classes.indent}>
                    {`- ${g}`}
                </Typography>
            ))}
        </>;
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.CHARACTER_DETAILS_HEADER}
                </Typography>
                {generateDetail(BS_DETAILS_LABEL.SOURCE, sourceMaterial)}
                {generateDetail(BS_DETAILS_LABEL.SOURCE_TYPE, sourceType)}
                {generateDetail('Groups', groups.length)}
                {groups.length > 0 && generateGroupDetail()}
                {generateDetail(BS_DETAILS_LABEL.MORE_SIMILAR_FIGURE(name), similarFigures.length)}
                {similarFigures.length > 0 && generatSimilarFigureList()}
                {generateDetail(BS_DETAILS_LABEL.MULTIPACK_FIGURE, multipackFigures.length)}
                {multipack && generatMulitpackFigureList()}
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
    indent: {
        marginLeft: theme.spacing(2),
    },
}));

CharacterDetailCard.propTypes = {
    groups: PropTypes.array,
    multipack: PropTypes.string,
    multipackFigures: PropTypes.array,
    name: PropTypes.string.isRequired,
    similarFigures: PropTypes.array,
    sourceMaterial: PropTypes.string.isRequired,
    sourceType: PropTypes.string.isRequired,
};
