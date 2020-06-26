import React from "react";
import { Segment, Grid, Image, Label, Header } from "semantic-ui-react";

const Contact = ({ contact, onClick }) => {
    return (
        <Segment onClick={onClick(contact)} style={{ backgroundColor: contact.favorite ? "yellow" : "while" }}>
            <Grid textAlign="center" verticalAlign="middle" columns="3">
                <Grid.Column>
                    <Grid columns="2" verticalAlign="middle">
                        <Grid.Column>
                            <Image src={contact.photo.url} alt="Contact photo" circular size="tiny" />
                        </Grid.Column>
                        <Grid.Column>
                            <Header>
                                {
                                    (contact.firstName || "") +
                                    " " +
                                    (contact.lastName || "")
                                }
                            </Header>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Label color="green">{contact.category.name}</Label>
                    {contact.who ? <Label color="red">{contact.who}</Label> : ""}
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Contact;
