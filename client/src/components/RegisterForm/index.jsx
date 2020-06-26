import React, { useState } from "react";
import { Form, Button, Label } from "semantic-ui-react";
import validator from "validator";
import FileInput from "../FileInput";

const RegisterForm = ({ register, set }) => {
    const [firstName, FirstName] = useState("");
    const [lastName, LastName] = useState("");
    const [email, Email] = useState("");
    const [password, Password] = useState("");
    const [image, Image] = useState(null);
    const [emailValid, EmailValid] = useState(true);
    const [passwordValid, PasswordValid] = useState(true);
    const [loading, Loading] = useState(false);

    const Register = async () => {
        const valid = emailValid && passwordValid;
        const fields = email && password;
        if (!valid || !fields || loading) return;
        Loading(true);
        const firstNameO = firstName ? { firstName } : {};
        const lastNameO = lastName ? { lastName } : {};
        const imageO = image ? { photo: image } : {};
        const result = await register({ email, password, ...lastNameO, ...firstNameO, ...imageO });
        Loading(false);

        if (result.message) {
            alert(result.message);
        } else if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.token));
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

    document.title = "Contact Book | Sign up";

    return (
        <Form onSubmit={Register}>
            <Form.Input
                type="text"
                fluid
                iconPosition="left"
                icon="users"
                placeholder="First name"
                onChange={e => FirstName(e.target.value)}
            />
            <Form.Input
                type="text"
                fluid
                iconPosition="left"
                icon="users"
                placeholder="Last name"
                onChange={e => LastName(e.target.value)}
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
            />
            <Label style={{ marginBottom: 10 }} color={password.length >= 6 ? "green" : "grey"}>
                Password must be at least 6 characters long
            </Label>
            <Form.Input
                icon="lock"
                type="password"
                iconPosition="left"
                placeholder="Password"
                error={!passwordValid}
                fluid
                onChange={e => setPassword(e.target.value)}
                onBlur={() => PasswordValid(Boolean(password && password.length >= 6))}
            />
            <FileInput buttonText="Choose profile photo" onChange={id => Image(id)} setLoading={Loading} />
            <div style={{ marginBottom: 10 }}>Don't worry, if your image does not load. Just wait for a several minutes</div>
            <Button
                color="teal"
                size="large"
                fluid
                primary
                type="submit"
                loading={loading}
                disabled={!Boolean(password && email && emailValid) || !(password.length >= 6)}
            >
                Sign up
            </Button>
        </Form>
    );
};

export default RegisterForm;
