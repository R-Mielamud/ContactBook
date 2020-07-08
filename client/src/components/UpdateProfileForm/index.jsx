import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import validator from "validator";
import FileInput from "../FileInput";

const UpdateProfileForm = ({ update, set, defs }) => {
    const [firstName, FirstName] = useState(defs.firstName || "");
    const [lastName, LastName] = useState(defs.lastName || "");
    const [email, Email] = useState(defs.email || "");
    const [password, Password] = useState(null);
    const [image, Image] = useState(defs.photo ? (defs.photo._id || "") : "");
    const [emailValid, EmailValid] = useState(true);
    const [passwordValid, PasswordValid] = useState(false);
    const [loading, Loading] = useState(false);
    const [errorMessage, ErrorMessage] = useState("");

    const Update = async () => {
        const valid = emailValid && passwordValid;
        if (!valid || !email || !password || loading) return;
        Loading(true);
        const result = await update({ email, password, lastName, firstName, photo: image || "" });
        Loading(false);

        if (result.message) {
            ErrorMessage(result.message);
        } else if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            set(result.user);
            window.location.href = "/";
        }
    };

    const setEmail = val => {
        Email(val);
        EmailValid(true);
    };

    const setPassword = val => {
        Password(val);
        PasswordValid(true);
    }

    document.title = "Contact Book | Update profile";

    return (
        <Form onSubmit={Update}>
            <Form.Input
                type="text"
                fluid
                iconPosition="left"
                icon="users"
                placeholder="First name"
                onChange={e => FirstName(e.target.value)}
                defaultValue={firstName}
            />
            <Form.Input
                type="text"
                fluid
                iconPosition="left"
                icon="users"
                placeholder="Last name"
                onChange={e => LastName(e.target.value)}
                defaultValue={lastName}
            />
            <Form.Input
                icon="at"
                type="email"
                iconPosition="left"
                placeholder="Email"
                error={!emailValid}
                fluid
                onChange={e => setEmail(e.target.value)}
                onBlur={() => EmailValid(validator.isEmail(email))}
                defaultValue={email}
            />
            <Form.Input
                icon="lock"
                type="password"
                iconPosition="left"
                placeholder="Password"
                error={!passwordValid}
                fluid
                onChange={e => setPassword(e.target.value)}
                onBlur={() => PasswordValid(Boolean(password && password.length >= 6))}
                defaultValue={password}
            />
            <FileInput buttonText="Choose profile photo" onChange={id => Image(id)} setLoading={Loading} startUploaded />
            <Button.Group fluid>
                <Button
                    color="teal"
                    size="large"
                    primary
                    type="submit"
                    loading={loading}
                    disabled={!Boolean(email && password && emailValid) || !(password ? password.length >= 6 : true)}
                >
                    Update my profile
                </Button>
                <Button
                    color="teal"
                    size="large"
                    secondary
                    type="button"
                    onClick={() => window.location.href = "/"}
                >
                    Cancel
                </Button>
            </Button.Group>
            {errorMessage ? (
                <Message negative style={{ display: "block" }}>
                    <Message.Header>Error!</Message.Header>
                    <Message.Content>
                        {errorMessage}
                    </Message.Content>
                </Message>
            ) : ""}
        </Form>
    );
};

export default UpdateProfileForm;
