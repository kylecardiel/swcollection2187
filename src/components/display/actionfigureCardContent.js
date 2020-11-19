import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { BS_CARD_LABELS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { getSourceColor } from 'components/display/figureColors';
import PropTypes from 'prop-types';
import { ROLES } from 'shared/constants/roleConstants';
import { UserConsumer } from 'components/auth/authContext';

export const ActionFigureCardContent = ({ record, sourceMaterials }) => {
    const { email } = useContext(UserConsumer);
    const authEmail = email === ROLES.EMAIL;
    
    let bottomCardHieght = 100;
    if(email) bottomCardHieght = 125;
    const classes = useStyles({ bottomCardHieght });

    const generateBottomText = (label, value) => {
        return <Grid item xs={12} key={value} >
            <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext}>
                <span className={classes.textStyle} >{`${label} `}</span>
                {value}
            </Typography>
        </Grid>;
    };

    const generateAdditionalNameText = value => {
        let text, className;
        if(value){
            text = value;
            className = classes.nameText;
        } else {
            text = '-';
            className = classes.noShowText;
        }

        return <Grid item xs={12} key={value} >
            <Typography variant='body2' component='p' className={classes.bottomtext} >
                <span className={className}>{text}</span>
            </Typography>
        </Grid>;
    };

    const generateSourceMaterialText = () => {
        let sourceMaterialBackgroundColor = '';
        let sourceMaterialTextColor = 'yellow';
        const isSeries4 = record.assortment === 'Series 4.0';
        if (isSeries4) {
            const sourceMaterialColor = getSourceColor(sourceMaterials.values, record.sourceMaterial);
            sourceMaterialBackgroundColor = sourceMaterialColor.backgroundColor;
            sourceMaterialTextColor = sourceMaterialColor.textColor;
        }

        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} style={{ backgroundColor: Color.primary(sourceMaterialBackgroundColor) }}>
            <span
                className={classes.textStyle}
                style={{ color: Color.primary(sourceMaterialTextColor) }}
            >
                {`${record.sourceMaterial} `}
            </span>
        </Typography>;
    };

    return (
        <Card className={classes.bottomCard}>
            <CardContent >
                <Grid container spacing={0} className={classes.top}>
                    {generateAdditionalNameText(record.additionalNameDetails)}
                    {record.sourceMaterial && generateSourceMaterialText()}
                    {record.version && generateBottomText(`${BS_CARD_LABELS.VERSION}: `, ` ${record.version}`)}
                    {record.multipack && generateBottomText('', ` [${record.multipack}]`)}
                    {record.exclusiveRetailer && generateBottomText('', ` ${record.exclusiveRetailer}`)}
                    {record.owned
                        && generateBottomText(`${BS_CARD_LABELS.TOTAL_OWNED}: `, ` ${record.newInBoxQty + record.looseCompleteQty + record.looseIncompleteQty}`)}
                    {authEmail && generateBottomText(record.id)}
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles(() => ({
    bottomCard: {
        maxWidth: 325,
        height: props => props.bottomCardHieght,
        backgroundColor: Color.black(),
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },
    bottomtext: {
        fontSize: '11px',
        color: Color.white(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    source: {
        backgroundColor: Color.white(),
        width: '100%',
    },
    textStyle: {
        fontWeight: 'bold',
        color: Color.yellow(),
        display: 'inline-block',
    },
    nameText: {
        color: Color.white(),
        display: 'inline-block',
    },
    noShowText: {
        fontWeight: 'bold',
        color: Color.black(),
        display: 'inline-block',
    },
    owned: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.white(),
        backgroundColor: Color.grey(),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Color.red(),
        },
        height: 30,
    },
}));

ActionFigureCardContent.propTypes = {
    record: PropTypes.object.isRequired,
    sourceMaterials: PropTypes.object.isRequired,
};
