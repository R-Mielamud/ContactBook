import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import validator from "validator";

const LoginForm = ({ login, set }) => {
    const [email, Email] = useState("");
    const [password, Password] = useState("");
    const [emailValid, EmailValid] = useState(true);
    const [passwordValid, PasswordValid] = useState(true);
    const [loading, Loading] = useState(false);

    const LogIn = async () => {
        const valid = emailValid && passwordValid;
        if (!email || !password || !valid || loading) return;
        Loading(true);
        const result = await login({ email, password });
        Loading(false);

        if (result.message) {
            alert(result.message);
        } else if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            set(result.user);
            window.location.href = "/";
        }
    }

    const setEmail = val => {
        Email(val);
        EmailValid(true);
    }

    const setPassword = val => {
        Password(val);
        PasswordValid(true);
    }

    return (
        <Form onSubmit={LogIn}>
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
            <Form.Input
                icon="lock"
                type="password"
                iconPosition="left"
                placeholder="Password"
                error={!passwordValid}
                fluid
                onChange={e => setPassword(e.target.value)}
                onBlur={() => PasswordValid(Boolean(password))}
            />
            <Button
                color="teal"
                size="large"
                fluid
                primary
                type="submit"
                loading={loading}
                disabled={!Boolean(email && password)}
            >
                Log in
            </Button>
        </Form>
    );
};

export default LoginForm;
