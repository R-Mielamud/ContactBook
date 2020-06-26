import React from "react";
import { Grid, Segment, Header, Message, Button } from "semantic-ui-react";
import { register } from "../../services/user";
import RegisterForm from "../../components/RegisterForm";
import { connect } from "react-redux";
import { setProfile } from "../../redux/actions";
import Logo from "../../components/Logo";

const RegisterPage = ({ setProfile }) => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="fill">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Logo />
                <Header as="h2" color="olive">Sign up to Contact Book</Header>
                <Segment>
                    <RegisterForm register={register} set={setProfile} />
                </Segment>
                <Message>
                    <Message.Header>Already with us?</Message.Header>
                    <Message.Content>
                        <Button
                            onClick={() => window.location.href = "/login"}
                            compact
                            size="small"
                            color="teal"
                            style={{ marginTop: 10 }}
                        >
                            Log in
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
