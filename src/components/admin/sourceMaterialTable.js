import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
// import Modal from 'react-modal';
// import { modalStyles } from 'shared/styles/modalStyles';
import { SortingUtils } from 'shared/util/sortingUtil';
// import { SourceMaterialForm } from 'components/admin/sourceMaterialForm';

const TYPES = {
    MOVIE: 'Movie',
    TV: 'TV',
    VG: 'Video Game',
};

export const SourceMaterialTable = ({ sourceMaterials }) => {
    const classes = useStyles();

    // const [isModalOpen, setIsModalOpen] = useState(false);

    const getSourceByType = (type) => {
        return SortingUtils.sortDataByAttributeAsc(sourceMaterials.values.filter(s => s.type === type), 'year');
    };
    
    const [movies] = useState(getSourceByType(TYPES.MOVIE));
    const [tvShows] = useState(getSourceByType(TYPES.TV));
    const [videoGames] = useState(getSourceByType(TYPES.VG));
    const [other] = useState(sourceMaterials.values.filter(s => ![TYPES.MOVIE, TYPES.TV, TYPES.VG].includes(s.type)));
    // const [selectedSourceColor, setSelectedSourceColor] = useState('white');

    // const modalSize = { height: '243px', width: '225px' };

    // const openModal = (sourceName) => {
    //     const source = sourceMaterials.values.filter(s => s.name === sourceName);

    //     setSelectedSourceColor(source.color);
    //     setIsModalOpen(!isModalOpen);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // };

    // onClick={() => openModeal(s.name)}

    const generateSoureMaterialCard = (sourceType) => {
        return sourceType.map(
            s => <Grid item xs={12} md={3} key={s.name}>
                <Card className={classes.card} key={s.name}>
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            <span className={classes.textStyle}>{s.name}</span>
                        </Typography>
                        <Divider />
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {s.year}
                        </Typography>
                        <div style={{ 
                            width: '90%', 
                            height: '25px', 
                            backgroundColor: s.color, 
                            color: 'white', 
                            fontWeight: 'bold',
                            paddingTop: '5px',
                            paddingDown: '5px',
                            margin: '5%',
                        }}>
                            {s.color}
                        </div>
                    </CardContent>
                </Card>
            </Grid>,
        );
    };


    return(
        <Grid 
            container
            direction='row'
            alignItems='center'
            spacing={1}
        >
            {/* <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <SourceMaterialForm />
            </Modal> */}
            <Grid item xs={12}>
                <h1>Movies</h1>
            </Grid>
            {generateSoureMaterialCard(movies)}
            <Grid item xs={12}>
                <h1>TV Shows</h1>
            </Grid>
            {generateSoureMaterialCard(tvShows)}
            <Grid item xs={12}>
                <h1>Video Games</h1>
            </Grid>
            {generateSoureMaterialCard(videoGames)}
            <Grid item xs={12}>
                <h1>Others</h1>
            </Grid>
            {generateSoureMaterialCard(other)}
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        maxHeight: 325,
        textAlign: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        color: 'black',
        display: 'inline-block',
    },
}));

SourceMaterialTable.propTypes = {
    sourceMaterials: PropTypes.object.isRequired, 
};