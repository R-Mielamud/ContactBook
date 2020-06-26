import React, { useState } from "react";
import { Form } from "semantic-ui-react"

export default ({ onChangeCode, onChangeVal, valPlaceholder, codePlaceholder, codeDef = "", valDef = "" }) => {
    const [val, Val] = useState("");
    const [code, Code] = useState("");

    return (
        <Form.Group>
            <Form.Input
                width={7}
                error={code ? !(code.startsWith("+") && code.length >= 2 && code.length <= 4) : false}
                onChange={e => {
                    onChangeCode(e);
                    Code(e.target.value);
                }}
                placeholder={codePlaceholder}
                defaultValue={codeDef}
            />
            <Form.Input
                width={7}
                error={val ? !(/^[0-9]{9}$/.test(val)) : false}
                onChange={e => {
                    onChangeVal(e);
                    Val(e.target.value);
                }}
                placeholder={valPlaceholder}
                defaultValue={valDef}
            />
        </Form.Group>
    );
};
