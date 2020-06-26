import React from "react";
import { Route } from "react-router";

const PrivateRoute = ({ authorized, component: Component, ...rest }) => {
    const Redirect = () => {
        return (
            <>
                {window.location.href = "/login"}
            </>
        );
    }

    if (authorized) {
        return <Route component={Component} {...rest} />
    } else {
        return <Route component={Redirect} />
    }
};

export default PrivateRoute;
