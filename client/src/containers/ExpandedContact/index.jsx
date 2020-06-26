import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setExpandedContact } from "../../redux/actions";
import { Modal, Grid, Label, Button, Image } from "semantic-ui-react";
import { get as getCategories } from "../../services/category";
import UpdateContactPage from "../UpdateContactPage";
import { deleteContact } from "../../services/contact";

const ExpandedContact = ({ contact, Close }) => {
    const categories = useRef();
    const requested = useRef();

    useEffect(() => {
        (async () => {
            if (!requested.current) {
                categories.current = await getCategories();
                requested.current = true;
            }
        })();
    });

    if (!contact) return "";

    return (
        <Modal onClose={Close} dimmer="blurring" centered={false} open closeIcon>
            <Modal.Header>
                {(contact.firstName || "") + " " + (contact.lastName || "") + ((contact.who && (" - " + contact.who)) || "")}
            </Modal.Header>
            <Modal.Content>
                <Grid columns="4">
                    <Grid.Column>
                        {contact.mainEmail ? (
                            <p>
                                Email:
                                <a href={"mailto:" + contact.mainEmail}>{" " + contact.mainEmail}</a>
                            </p>
                        ) : ""}
                        
                        {contact.mainTelephone ? (
                            <p>
                                Telephone:
                                <a href={"tel:" + contact.mainTelephone.code + contact.mainTelephone.value}>
                                    {" " + contact.mainTelephone.code + contact.mainTelephone.value}
                                </a>
                            </p>
                        ) : ""}

                        {contact.favorite ? <Label color="yellow">Favorite</Label> : ""}
                        <Label color="green">{contact.category.name}</Label>
                    </Grid.Column>
                    <Grid.Column>
                        {contact.telephones && contact.telephones.map((telephone, i) => 
                            <p key={i}>
                                <a href={"tel:" + telephone.code + telephone.value}>
                                    {telephone.code + telephone.value}
                                </a>
                            </p>)}
                    </Grid.Column>
                    <Grid.Column>
                        {contact.emails && contact.emails.map((email, i) => 
                            <p key={i}>
                                <a href={"mailto:" + email}>
                                    {email}
                                </a>
                            </p>)}
                    </Grid.Column>
                    <Grid.Column>
                        {contact.messangers ? (
                            <>
                                {contact.messangers.telegram ? <div>Telegram: {contact.messangers.telegram}</div> : ""}
                                {contact.messangers.viber ? <div>Viber: {contact.messangers.viber}</div> : ""}
                                {contact.messangers.whatsapp ? <div>Whatsapp: {contact.messangers.whatsapp}</div> : ""}
                                {contact.messangers.facebook ? <div>Facebook: {contact.messangers.facebook}</div> : ""}
                                {contact.messangers.instagram ? <div>Instagram: {contact.messangers.instagram}</div> : ""}
                                {contact.messangers.twitter ? <div>Twitter: {contact.messangers.twitter}</div> : ""}
                            </>
                        ) : ""}
                    </Grid.Column>
                </Grid>
                <div style={{ whiteSpace: "pre-wrap", margin: 10 }}>{contact.about}</div>
                <Image circular centered size="small" src={contact.photo.url} alt="Photo" />
            </Modal.Content>
            <Modal.Actions>
                <Button.Group>
                    <Button positive compact onClick={Close}>Close</Button>
                    {requested.current ? (
                        <Modal openOnTriggerClick closeIcon trigger={<Button color="yellow" compact>Update</Button>}>
                            <Modal.Header>Update contact</Modal.Header>
                            <Modal.Content>
                                <UpdateContactPage id={contact._id} categories={categories.current} defs={contact} />
                            </Modal.Content>
                        </Modal>
                    ) : ""}
                    <Modal openOnTriggerClick closeIcon trigger={<Button negative icon="trash" compact />}>
                        <Modal.Header>Are you sure?</Modal.Header>
                        <Modal.Content>
                            Are you sure want to delete this contact?
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={async () => {
                                await deleteContact(contact._id);
                                window.location.reload();
                            }}>
                                Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Button.Group>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = state => ({
    contact: state.contacts.expanded
});

const mapDispatchToProps = dispatch => ({
    Close: () => dispatch(setExpandedContact(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedContact);
