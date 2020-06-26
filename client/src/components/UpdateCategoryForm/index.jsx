import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { update } from "../../services/category";

const UpdateCategoryForm = ({ defs, id }) => {
    const [name, Name] = useState(defs.name || "");
    const [about, About] = useState(defs.about || "");
    const [loading, Loading] = useState(false);

    const Update = async () => {
        if (!name || loading) return;
        Loading(true);
        await update(id, { name, about });
        Loading(false);
        window.location.reload();
    }

    return (
        <Form onSubmit={Update}>
            <Form.Input
                fluid
                icon="id card outline"
                iconPosition="left"
                placeholder="Name"
                onChange={e => Name(e.target.value)}
                defaultValue={name}
            />
            <Form.TextArea
                fluid="true"
                placeholder="About"
                onChange={e => About(e.target.value)}
                defaultValue={about}
            />
            <Button
                fluid
                primary
                type="submit"
                loading={loading}
                disabled={!name}
            >
                Update category
            </Button>
        </Form>
    );
};

export default UpdateCategoryForm;
