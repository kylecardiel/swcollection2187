import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';

export const CharacterDetailCard = ({ groups, multipack, multipackFigures, name, similarFigures, sourceMaterial }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        const adjustedValue = value ? value : 'N/A';
        return <>
            <Divider />
            <div className={classes.detailRow}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {label}
                </Typography>
                <Typography variant='body2' component='p'>
                    {adjustedValue}
                </Typography>
            </div>
        </>;
    };

    const generatSimilarFigureList = () => {
        return <>
            {similarFigures.map(f => (
                <Typography variant='body2' gutterBottom component='p' key={`${f.additionalNameDetails}-${f.assortment}`}>
                    {`- ${f.name} `}
                    {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                    {BS_DETAILS_LABEL.MORE_ASSORTMENT(f.assortment)}
                    {f.version && `[${f.version}]`}
                </Typography>
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
};
