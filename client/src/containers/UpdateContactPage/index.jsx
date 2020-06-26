import React from "react";
import Logo from "../../components/Logo";
import { Header, Grid, Segment } from "semantic-ui-react";
import UpdateContactForm from "../../components/UpdateContactForm";

const UpdateContactPage = ({ categories, id, defs }) => {
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 500 }}>
                <Logo noImage />
                <Header color="olive" size="large">Update contact in your book</Header>
                <Segment>
                    <UpdateContactForm categories={categories} id={id} defs={defs} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default UpdateContactPage;
