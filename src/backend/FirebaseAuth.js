import firebase from 'backend/Firebase';
import { defaultUser } from 'components/auth/authContext';

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

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
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      if (error.message !== null) {
        alert(error.message);
      }
    })
};

export const logout = () => {
  auth.signOut();
};

export const registerUser = registrationInfo => {
  auth.createUserWithEmailAndPassword(
    registrationInfo.email,
    registrationInfo.password
  ).then(() => {
    auth.onAuthStateChanged(user => {
      user.updateProfile({
        email: registrationInfo.email,
      })
    })
  })
    .catch(error => {
      if (error.message !== null) {
        alert(error.message);
      }
    })
};
