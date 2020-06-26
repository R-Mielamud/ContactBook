import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import { update } from "../../services/user";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import { connect } from "react-redux";
import { setProfile } from "../../redux/actions";
import Logo from "../../components/Logo";

const UpdateProfilePage = ({ setProfile, defs }) => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="fill">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Logo />
                <Header as="h2" color="olive">Update your Contact Book profile</Header>
                <Segment>
                    <UpdateProfileForm update={update} set={setProfile} defs={defs} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = state => ({
    defs: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
    setProfile: user => dispatch(setProfile(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePage);
