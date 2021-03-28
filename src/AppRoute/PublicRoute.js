import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        !isAuthenticated ? (
            <Component {...props}/>
            
        ) : (
            <Redirect to="/rooms" />
        )
    )} />
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user
})

export default connect(mapStateToProps)(PublicRoute)