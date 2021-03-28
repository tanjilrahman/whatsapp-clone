import { Button } from '@material-ui/core';
import React from 'react';
import '../styles/Login.css';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

function Login(props) {
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={props.startLogin}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: dispatch(startLogin)
})

export default connect(undefined, mapDispatchToProps)(Login)
