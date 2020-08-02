import React, { useState } from 'react';
import { storage } from 'backend/Firebase';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';
import { ProgressBar } from 'components/common/progressBar';

const { CATALOG, ACTION_FIGURES } = FB_STORAGE_CONSTANTS;

export const UploadImage = () => {

    const [image, setImage] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [percentage, setPercentage] = useState(0);

    const handleChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        setDownloadURL(null);
        const uploadTask = storage.ref(`${CATALOG}${ACTION_FIGURES.BLACK_SERIES}${image.name}`).put(image);
        uploadTask.on(
            'state_changed', 
            function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercentage(progress);
                // console.log('Upload is ' + progress + '% done');
          }, function(error) {
                console.log(error)
          }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                setDownloadURL(downloadURL)
            });
          });
    }

    return (
        <React.Fragment>
            <input type='file' onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
            <ProgressBar percentage={percentage}/>
            <div>File available at:</div>
            {downloadURL && <p>{downloadURL}</p>}
        </React.Fragment>
    );
};