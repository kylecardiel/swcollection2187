import React from 'react';
import { Browser } from 'shared/util/browserUtil';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SectionHeader } from 'components/display/details/sectionHeader';
import Typography from '@material-ui/core/Typography';

export const CharacterDetail = ({ name, multipack, multipackFigures, similarFigures, sourceMaterial }) => {
    const containerHeight = Browser.isChrome() ? 315 : 343;
    const classes = useStyles({ containerHeight });

    return (
        <Grid xs={12} md={12} item className={classes.detailComponent}>
            <SectionHeader text={BS_DETAILS_LABEL.CHARACTER_DETAILS_HEADER} />
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>{BS_DETAILS_LABEL.SOURCE}:</span>
                {` ${sourceMaterial}`}
            </Typography>
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>{BS_DETAILS_LABEL.MORE(name, similarFigures.length)}</span>
            </Typography>

            <div className={classes.similarFiguresContainer}>
                {similarFigures.length > 0 && similarFigures.map(f => (
                    <Typography variant='body2' gutterBottom className={classes.similarFigures} key={`${f.additionalNameDetails}-${f.assortment}`}>
                        {`${f.name} `}
                        {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                        {BS_DETAILS_LABEL.MORE_ASSORTMENT(f.assortment)}
                        {f.version && `[${f.version}]`}
                    </Typography>
                ))}
            </div>
            
    
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>{BS_DETAILS_LABEL.MULTIPACK_FIGURES(multipackFigures.length)}</span>
            </Typography>
            <div className={classes.similarFiguresContainer}>
                {multipack && multipackFigures.map(f => (
                    <Typography variant='body2' gutterBottom className={classes.similarFigures} key={`${f.additionalNameDetails}-${f.assortment}`}>
                        {`${f.name} `}
                        {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                        {`[${f.multipack}]`}
                    </Typography>
                ))}
            </div>
        </Grid>                   
    );
};

const useStyles = makeStyles((theme) => ({
    detailName: {
        marginLeft: theme.spacing(2),
    },
    detailComponent: {
        border: '2px solid black',
        height: props => props.containerHeight,
    },
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    similarFiguresContainer: {
        marginLeft: theme.spacing(2),
        height: 100,
        overflow: 'scroll',
    },
    similarFigures: {
        marginLeft: theme.spacing(1),
    },
}));

CharacterDetail.propTypes = {
    name: PropTypes.string.isRequired,
    similarFigures: PropTypes.array,
    sourceMaterial: PropTypes.string.isRequired,
    multipack: PropTypes.string,
    multipackFigures: PropTypes.array,
};