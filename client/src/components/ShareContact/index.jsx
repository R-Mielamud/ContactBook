import React, { useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import validator from "validator";
import { share } from "../../services/contact";

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

    return (
        <Modal closeIcon openOnTriggerClick trigger={<Button positive><Icon name="share alternate" />Share</Button>}>
            <Modal.Header>
                Share a contact with person
            </Modal.Header>
            <Modal.Content>
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
