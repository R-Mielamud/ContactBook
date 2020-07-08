import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import LoginPage from "../LoginPage";
import MainPage from "../MainPage";
import PrivateRoute from "../PrivateRoute";
import { profile } from "../../services/user";
import Spinner from "../../components/Spinner";
import { connect } from "react-redux";
import RegisterPage from "../RegisterPage";
import UpdateProfilePage from "../UpdateProfilePage";
import NotFound from "../../scenes/NotFound";
import SharedContactPage from "../SharedContactPage";

class Routing extends React.Component {
    constructor({ user }) {
        super();
        this.history = createBrowserHistory();
        this.user = user;

        this.state = {
            requested: false,
            user: null
        }
    }

    componentDidMount() {
        const userString = localStorage.getItem("user");

        if (userString && this.user.profile) {
            if (!this.state.requested) {
                const email = JSON.parse(userString).email;

                profile(email).then(userProfile => {
                    localStorage.setItem("user", JSON.stringify(userProfile.user));
                    this.setState({ requested: true, user: userProfile.user });
                });
            }
        } else {
            this.setState({ requested: true, user: null });
        }
    }

    render() {
        if (!this.state.requested) {
            return <Spinner />
        } else {
            return (
                <Router history={this.history}>
                    <Switch>
                        <Route exact component={LoginPage} path="/login" />
                        <Route exaxt component={RegisterPage} path="/register" />
                        <PrivateRoute exact authorized={Boolean(this.state.user) || false} component={MainPage} path="/" />
                        <PrivateRoute exact authorized={Boolean(this.state.user) || false} component={UpdateProfilePage} path="/update" />
                        <PrivateRoute authorized={Boolean(this.state.user) || false} component={SharedContactPage} path="/shared/:id" />
                        <Route path="*" exact component={NotFound} />
                    </Switch>
                </Router>
            );
        }
    }
}

const mapStateToProps = state => ({
    user: state.profile
});

export default connect(mapStateToProps)(Routing);
