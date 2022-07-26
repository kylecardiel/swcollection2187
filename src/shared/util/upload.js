import { storage } from 'backend/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadImageToStorage = async (location, image, setPercentage) => {
    return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(ref(storage, location), image);
        uploadTask.on('state_changed',
            snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercentage(progress);
            },
            function error(err) {
                console.log('error', err);
                reject();
            },
            function complete() {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            },
        );
    });
};