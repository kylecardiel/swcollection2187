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
        this.setState({
          user: user,
          displayName: user.displayName,
          userId: user.uid,
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
    const { userId } = this.state;
    return (
      <Routes
        registerUser={this.registerUser}
        userLoggedIn={userId !== null}
        logoutUser={this.logoutUser}
        userId={userId}
      />
    );
  }
}
