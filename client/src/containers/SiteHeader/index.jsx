import React from "react";
import { Header, Image, Grid, Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../services/user";
import ProfilePage from "../ProfilePage";

const SiteHeader = ({ user }) => {
    const getUserText = () => {
        if (user.firstName && (user.lastName || true)) {
            return user.firstName + " " + (user.lastName || "");
        } else {
            return user.email;
        }
    };

    const LogOut = () => {
        logout().then(() => {
            localStorage.clear();
            window.location.reload();
        });
    };

    return (
        <Grid centered columns="2" style={{ padding: "1em 0", backgroundColor: "white" }} verticalAlign="middle">
            <Grid.Column textAlign="center" verticalAlign="middle">
                <Header>
                    <Image src={user.photo.url} circular size="massive" alt="Profile avatar" />
                    {" "}
                    {getUserText()}
                </Header>
            </Grid.Column>
            <Grid.Column textAlign="center" verticalAlign="middle">
                <Button.Group>
                    <Button
                        icon="sign out alternate"
                        color="red"
                        size="large"
                        onClick={LogOut}
                    />
                    <Button
                        icon="refresh"
                        color="yellow"
                        size="large"
                        onClick={() => window.location.href = "/update"}
                    />
                    <Modal openOnTriggerClick closeIcon dimmer="blurring" trigger={
                        <Button
                            icon="info"
                            positive
                            size="large"
                        />
                    }>
                        <Modal.Header>Profile</Modal.Header>
                        <Modal.Content>
                            <ProfilePage />
                        </Modal.Content>
                    </Modal>
                </Button.Group>
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = state => ({
    user: state.profile.profile
});

export default connect(mapStateToProps)(SiteHeader);
