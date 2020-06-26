import React from "react";
import { Grid, Segment, Header, Message, Button } from "semantic-ui-react";
import { login } from "../../services/user";
import LoginForm from "../../components/LoginForm";
import { connect } from "react-redux";
import { setProfile } from "../../redux/actions";
import Logo from "../../components/Logo";

const LoginPage = ({ setProfile }) => {
    document.title = "Contact Book | Log in";

    return (
        <Grid textAlign="center" verticalAlign="middle" className="fill">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Logo />
                <Header as="h2" color="olive">Log in to your account</Header>
                <Segment>
                    <LoginForm login={login} set={setProfile} />
                </Segment>
                <Message>
                    <Message.Header>New to us?</Message.Header>
                    <Message.Content>
                        <Button
                            onClick={() => window.location.href = "/register"}
                            compact
                            size="mini"
                            color="teal"
                            style={{ marginTop: 10 }}
                        >
                            Sign up
                        </Button>
                    </Message.Content>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    setProfile: user => dispatch(setProfile(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
