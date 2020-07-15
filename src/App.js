import React, { Component } from 'react';
import { Routes } from './routes/routes';
import firebase from 'backend/Firebase';

export class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userId: null,
    };
  }

  componentDidMount() {
    this.onAuthStateChanged();
  }

  onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user,
          displayName: user.displayName,
          userId: user.uid,
        });

      } else {
        this.setState({
          user: null,
          displayName: null,
          userId: null,
        });
      }
    });
  }

  registerUser = (firstName, lastName, email) => {
    firebase.auth().onAuthStateChanged(user => {
      user.updateProfile({
        displayName: firstName + ' ' + lastName,
        email: email,
      }).then(() => {
        const userProfile = this.createUserProfile(user, firstName, lastName);
        this.setState({
          user: user,
          displayName: user.displayName,
          userId: user.uid,
          roles: userProfile.roles,
        });
      })
    })
  }


  logoutUser = event => {
    event.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userId: null,
    });
    firebase.auth().signOut().then(() => { })
  };

  render() {

    const {
      displayName,
      userId,
    } = this.state;

    const userLoggedIn = displayName !== null;

    return (
      <Routes
        registerUser={this.registerUser}
        displayName={displayName}
        userLoggedIn={userLoggedIn}
        logoutUser={this.logoutUser}
        userId={userId}
      />
    );

  }
}
