import { auth, createUserWithEmail, signIn, signOut } from 'backend/Firebase';
import { defaultUser } from 'components/auth/authContext';

export const onAuthStateChange = callback => {
    return auth.onAuthStateChanged(user => {
        if (user) {
            callback({
                loggedIn: true,
                email: user.email,
                id: user.uid,
            });
        } else {
            callback(defaultUser);
        }
    });
};

export const login = (email, password) => {
    signIn(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(error => {
            if (error.message !== null) {
                alert(error.message);
            }
        });
};

export const logout = () => {
    signOut(auth).then(() => {})
        .catch((error) => {
            if (error.message !== null) {
                alert(error.message);
            }
        });
};

export const registerUser = registrationInfo => {
    createUserWithEmail(auth, registrationInfo.email, registrationInfo.password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            if (error.message !== null) {
                alert(error.message);
            }
        });
};