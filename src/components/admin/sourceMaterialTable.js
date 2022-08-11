import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';

export const SourceMaterialTable = ({ sourceMaterials }) => {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [movies] = useState(sourceMaterials.values.filter(s => s.type === 'Movie'));
    const [tvShows] = useState(sourceMaterials.values.filter(s => s.type === 'TV'));
    const [videoGames] = useState(sourceMaterials.values.filter(s => s.type === 'Video Game'));
    const [other] = useState(sourceMaterials.values.filter(s => !['Movie', 'TV', 'Video Game'].includes(s.type)));
    const [selectedSourceColor, setSelectedSourceColor] = useState('white');

    const modalSize = { height: '243px', width: '225px' };

    const openModal = (sourceName) => {
        const source = sourceMaterials.values.filter(s => s.name === sourceName);

        setSelectedSourceColor(source.color);
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const generateSoureMaterialCard = (sourceType) => {
        return sourceType.map(
            s => <Grid item xs={12} md={3} key={s.name}>
                <Card className={classes.card} key={s.name} onClick={() => openModal(s.name)}>
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            <span className={classes.textStyle}>{s.name}</span>
                        </Typography>
                        <Divider />
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {s.type}
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
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <ChromePicker 
                    color={selectedSourceColor}
                />
            </Modal>
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