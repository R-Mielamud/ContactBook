import React, { useState } from "react";
import validator from "validator";
import { Form } from "semantic-ui-react"

export default ({ onChange, ...rest }) => {
    const [valid, Valid] = useState(true);

    return (
        <Form.Input 
            type="email"
            icon="at"
            iconPosition="left"
            fluid
            error={!valid}
            onChange={e => {
                onChange(e);
                Valid(validator.isEmail(e.target.value))
            }}
            {...rest}
        />
    );
};
