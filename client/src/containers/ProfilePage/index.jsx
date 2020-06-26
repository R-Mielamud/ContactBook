import React from "react";
import { connect } from "react-redux";
import { Image, Header, Segment, Grid } from "semantic-ui-react";

const ProfilePage = ({ user }) => {
    return (
        <Segment>
            <Header textAlign="center" size="huge">Your Contact Book profile info</Header>
            <Grid columns="2" textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    {user.firstName ? <p>First name: {user.firstName}</p> : ""}
                    {user.lastName ? <p>Last name: {user.lastName}</p> : ""}
                </Grid.Column>
                <Grid.Column>
                    <p>Email: {user.email}</p>
                </Grid.Column>
            </Grid>
            <Image centered circular src={user.photo.url} alt="Profile photo" />
        </Segment>
    );
};

const mapStateToProps = state => ({
    user: state.profile.profile
});

export default connect(mapStateToProps)(ProfilePage);
