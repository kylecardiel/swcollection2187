import React, { useState } from 'react';
import { ADMIN } from 'shared/constants/stringConstantsSelectors';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';
import { makeStyles } from '@material-ui/core/styles';
import { ProgressBar } from 'components/common/progressBar';
import PropTypes from 'prop-types';
import { storage } from 'backend/Firebase';

const { CATALOG, ACTION_FIGURES } = FB_STORAGE_CONSTANTS;

export const UploadImage = ({ assortment }) => {
    const classes = useStyles();
    
    const [image, setImage] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [percentage, setPercentage] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        setDownloadURL(null);
        const location = assortment 
            ? `${CATALOG}${ACTION_FIGURES.BLACK_SERIES}${assortment}/${image.name}` 
            : `${CATALOG}${ACTION_FIGURES.BLACK_SERIES}${image.name}`;

        const uploadTask = storage.ref(location).put(image);
        uploadTask.on(
            'state_changed',
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercentage(progress);
            }, function (error) {
                console.log(error);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    setDownloadURL(downloadURL);
                });
            });
    };

    return (
        <React.Fragment>
            <input type='file' onChange={handleChange} />
            <button onClick={handleUpload}>{ADMIN.BUTTON.UPLOAD}</button>
            <ProgressBar percentage={percentage} />
            <div>{ADMIN.IMAGE_FILE_LOCATION}</div>
            {downloadURL && <p className={classes.downloadURL}>{downloadURL}</p>}
        </React.Fragment>
    );
};

const useStyles = makeStyles(() => ({
    downloadURL: { 
        overflow: 'scroll', 
    },
}));

UploadImage.propTypes = {
    assortment: PropTypes.array,
};