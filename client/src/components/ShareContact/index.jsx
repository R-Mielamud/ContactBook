import React, { useState } from "react";
import { Modal, Button, Form, Icon, Divider } from "semantic-ui-react";
import validator from "validator";
import { share } from "../../services/contact";
import CopyToClipboard from "react-copy-to-clipboard";
import { NotificationManager, NotificationContainer } from "react-notifications";

const ShareContact = ({ id }) => {
    const [email, Email] = useState("");
    const [valid, Valid] = useState(true);
    const [loading, Loading] = useState(false);

    const setEmail = val => {
        Email(val);
        Valid(true);
    };

    const Share = async () => {
        if (!email || !valid) return;
        Loading(true);
        await share(id, email);
        Loading(false);
        window.location.reload();
    };

    const link = window.location.origin + "/shared/" + id;

    return (
        <Modal closeIcon openOnTriggerClick trigger={<Button positive><Icon name="share alternate" />Share</Button>}>
            <Modal.Header>
                Share a contact with person
            </Modal.Header>
            <Modal.Content>
                <Form.Input
                    fluid
                    value={link}
                    action={(
                        <CopyToClipboard text={link} onCopy={() => {
                            NotificationManager.success("Link copied to the clipboard", "Copied!", 2000)
                        }}>
                            <Button color="teal">
                                <Icon name="copy" />
                                Copy link to the contact
                            </Button>
                        </CopyToClipboard>
                    )}
                />
                <NotificationContainer />
                <Divider horizontal>or</Divider>
                <Form onSubmit={Share}>
                    <Form.Input
                        icon="at"
                        fluid
                        iconPosition="left"
                        placeholder="Email, on which you would like to send a message about sharing"
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => Valid(validator.isEmail(email))}
                        error={!valid}
                    />
                    <Button type="submit" positive disabled={!email} loading={loading}>Share!</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default ShareContact;
