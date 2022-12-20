import { auth } from 'backend/Firebase';
import { GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then()
        .catch(error => {
            if (error.message !== null) {
                alert(error.message);
            }
        });
};