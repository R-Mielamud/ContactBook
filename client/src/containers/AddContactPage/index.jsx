import React from "react";
import Logo from "../../components/Logo";
import { Header, Grid, Segment } from "semantic-ui-react";
import AddContactForm from "../../components/AddContactForm";

const AddContactPage = ({ categories }) => {
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
                <Logo noImage />
                <Header color="olive" size="large">Add contact to your book</Header>
                <Segment>
                    <AddContactForm categories={categories} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default AddContactPage;
