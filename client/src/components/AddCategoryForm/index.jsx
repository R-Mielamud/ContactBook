import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { add } from "../../services/category";
import strip from "../../stripEmpty.util";

const AddCategoryForm = () => {
    const [name, Name] = useState("");
    const [nameValid, NameValid] = useState(true);
    const [about, About] = useState("");
    const [loading, Loading] = useState(false);

    const setName = val => {
        NameValid(true);
        Name(val);
    };

    const Add = async () => {
        if (!name || !nameValid || loading) return;
        Loading(true);
        await add(strip({ name, about })[1]);
        Loading(false);
        window.location.reload();
    }

    return (
        <Form onSubmit={Add}>
            <Form.Input
                fluid
                icon="id card outline"
                iconPosition="left"
                placeholder="Name"
                onChange={e => setName(e.target.value)}
                onBlur={() => NameValid(Boolean(name))}
                error={!nameValid}
            />
            <Form.TextArea
                fluid="true"
                placeholder="About"
                onChange={e => About(e.target.value)}
            />
            <Button
                fluid
                primary
                type="submit"
                loading={loading}
            >
                Add category
            </Button>
        </Form>
    );
};

export default AddCategoryForm;
