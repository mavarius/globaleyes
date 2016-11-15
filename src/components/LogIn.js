import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { signInWithGoogle, signOut } from '../actions/auth'

//USER - Set or fetch the user object 

@connect(state => ({
  loggedIn: state.auth.authenticated,
  user: state.auth.user
}), dispatch => ({
  logOut() {
    dispatch(signOut())
  },
  logIn() {
    dispatch(signInWithGoogle())
  }
}))

export default class LogIn extends Component {
  _logIn = () => {
  this.props.logIn()
  browserHistory.push('/scenarios')
  }

  _logOut = () => {
    this.props.logOut()
  }

  render() {
    const { loggedIn } = this.props
    const logInButton = <button onClick={this._logIn} className="logIn">Sign Up / Log in</button>
    const logOutButton = <button onClick={this._logOut} className="logOut">Sign Out</button>
    return (
      <div className="loginBtn">
        {loggedIn ? logOutButton : logInButton}
      </div>
    )
  }
}
