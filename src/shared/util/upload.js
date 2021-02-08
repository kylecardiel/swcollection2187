import { storage } from 'backend/Firebase';

export const uploadImageToStorage = async (location, image, setPercentage) => {
    return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(location).put(image);
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
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL);
                });
            },
        );
    });
};