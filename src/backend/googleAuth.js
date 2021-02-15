import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then()
        .catch(error => {
            if (error.message !== null) {
                alert(error.message);
            }
        });
};