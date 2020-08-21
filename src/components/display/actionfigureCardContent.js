import { Card, CardContent, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { UserConsumer } from 'components/auth/authContext';
import React, { useContext } from 'react';
import { ROLES } from 'shared/constants/roleConstants';
import { Color } from 'shared/styles/color';
import { getSourceColor } from 'components/display/figureColors';

export const ActionFigureCardContent = ({ record, showAssortmentHeaders, sourceMaterials }) => {
    const classes = useStyles();
    const { email } = useContext(UserConsumer);

    const authEmail = email === ROLES.EMAIL;

    const generateBottomText = (label, value) => {
        return <Grid item xs={12} key={value} >
            <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext}>
                <span className={classes.textStyle} >{`${label} `}</span>
                {value}
            </Typography>
        </Grid>
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
        </Grid>
    };

    const generateSourceMaterialText = () => {
        let sourceMaterialBackgroundColor = '';
        let sourceMaterialTextColor = 'yellow';
        const isSeries4 = record.assortment === 'Series 4.0';
        if (isSeries4) {
            const sourceMaterialColor = getSourceColor(sourceMaterials.values, record.sourceMaterial);
            sourceMaterialBackgroundColor = sourceMaterialColor.backgroundColor;
            sourceMaterialTextColor = sourceMaterialColor.textColor;
        };

        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} style={{ backgroundColor: Color.primary(sourceMaterialBackgroundColor) }}>
            <span
                className={classes.textStyle}
                style={{ color: Color.primary(sourceMaterialTextColor) }}
            >
                {`${record.sourceMaterial} `}
            </span>
        </Typography>
    }

    return (
        <Card className={classes.bottomCard}>
            <CardContent >
                <Grid container spacing={0} className={classes.top}>
                    {generateAdditionalNameText(record.additionalNameDetails)}
                    {generateSourceMaterialText()}
                    {!showAssortmentHeaders && generateBottomText('', `${record.assortment}`)}
                    {record.version && generateBottomText('Version: ', ` ${record.version}`)}
                    {record.multipack && generateBottomText('', ` [${record.multipack}]`)}
                    {record.exclusiveRetailer && generateBottomText('', ` ${record.exclusiveRetailer}`)}
                    {record.owned
                        && record.purchasePrice && generateBottomText('Buy', ` $${record.purchasePrice}`)}
                    {record.owned
                        && generateBottomText('Total Owned: ', ` ${record.newInBoxQty + record.looseCompleteQty + record.looseIncompleteQty}`)}
                    {authEmail && generateBottomText(record.id)}
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles(theme => ({
    bottomCard: {
        maxWidth: 325,
        height: 125,
        backgroundColor: Color.black(),
        borderRadius: 0,
    },
    br: {
        fontSize: '11px',
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