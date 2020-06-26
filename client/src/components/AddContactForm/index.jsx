import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import FileInput from "../FileInput";
import EmailField from "./EmailField";
import TelField from "./TelField";
import strip from "../../stripEmpty.util";
import { addContact } from "../../services/contact";

const AddContactForm = ({ categories }) => {
    const [first, First] = useState("");
    const [last, Last] = useState("");
    const [mainTelCode, MainTelCode] = useState("");
    const [mainTelVal, MainTelVal] = useState("")
    const [mainEmail, MainEmail] = useState("");
    const [category, Category] = useState(categories[0]._id);
    const [emails, Emails] = useState([]);
    const [tels, Tels] = useState([]);
    const [birthDate, BirthDate] = useState("");
    const [who, Who] = useState("");
    const [about, About] = useState("");
    const [telegram, Telegram] = useState("");
    const [viber, Viber] = useState("");
    const [whatsapp, Whatsapp] = useState("");
    const [facebook, Facebook] = useState("");
    const [twitter, Twitter] = useState("");
    const [instagram, Instagram] = useState("");
    const [favorite, Favorite] = useState(false);
    const [photo, Photo] = useState("");
    const [loading, Loading] = useState(false);

    const categoriesOpts = categories.map(cat => ({ key: cat._id, value: cat._id, text: cat.name }));

    const RegisterContact = async () => {
        Loading(true);

        const settings = strip({
            firstName: first,
            lastName: last,
            mainTelephone: {
                code: mainTelCode,
                value: mainTelVal
            },
            mainEmail,
            category,
            emails,
            telephones: tels,
            who,
            about,
            messangers: {
                telegram,
                viber,
                whatsapp,
                instagram,
                twitter,
                facebook
            },
            favorite,
            photo
        })[1];

        if (birthDate) {
            settings.birthDate = new Date(
                (new Date(birthDate)).getFullYear(),
                (new Date(birthDate)).getMonth() + 1,
                (new Date(birthDate)).getDate()
            );
        }

        await addContact(settings);

        Loading(false);
        window.location.reload();
    };

    return (
        <Form onSubmit={RegisterContact}>
            <Form.Group>
                <Form.Input
                    width={7}
                    fluid
                    icon="users"
                    iconPosition="left"
                    onChange={e => First(e.target.value)}
                    placeholder="First name"
                />
                <Form.Input
                    width={7}
                    fluid
                    icon="users"
                    iconPosition="left"
                    onChange={e => Last(e.target.value)}
                    placeholder="Last name"
                />
            </Form.Group>
            <TelField
                onChangeCode={e => MainTelCode(e.target.value)}
                codePlaceholder="Main telephone code"
                onChangeVal={e => MainTelVal(e.target.value)}
                valPlaceholder="Main telephone value"
            />
            {tels.map((tel, i) => (
                <TelField
                    key={i}
                    onChangeCode={e => tels[i].code = e.target.value}
                    onChangeVal={e => tels[i].value = e.target.value}
                    codePlaceholder={"Tel #" + (i + 2) + " code"}
                    valPlaceholder={"Tel #" + (i + 2) + " value"}
                    valDef={tel.value}
                    codeDef={tel.code}
                />
            ))}
            <Button
                fluid
                positive
                disabled={tels.length > 9}
                onClick={() => tels.length <= 10 ? Tels([...tels, { code: "", value: "" }]) : null}
                style={{ marginBottom: 10 }}
                type="button"
            >
                + Add telephone
            </Button>
            <EmailField
                onChange={e => MainEmail(e.target.value)}
                placeholder="Main email"
            />
            {emails.map((email, i) => (
                <EmailField
                    key={i}
                    onChange={e => emails[i] = e.target.value}
                    placeholder={"Email #" + (i + 2)}
                    defaultValue={email}
                />
            ))}
            <Button
                fluid
                positive
                disabled={emails.length > 9}
                onClick={() => emails.length <= 10 ? Emails([...emails, ""]) : null}
                style={{ marginBottom: 10 }}
                type="button"
            >
                + Add email
            </Button>
            <Form.Select options={categoriesOpts} onChange={(e, data) => Category(data.value)} defaultValue={category} />
            <Form.Input
                fluid
                onChange={e => Who(e.target.value)}
                placeholder="Who"
            />
            <Form.TextArea
                onChange={e => About(e.target.value)}
                placeholder="About"
            />
            <Form.Group style={{ width: "100%" }}>
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Telegram"
                    onChange={e => Telegram(e.target.value)}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Viber"
                    onChange={e => Viber(e.target.value)}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Whatsapp"
                    onChange={e => Whatsapp(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Facebook"
                    onChange={e => Facebook(e.target.value)}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Twitter"
                    onChange={e => Twitter(e.target.value)}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Instagram"
                    onChange={e => Instagram(e.target.value)}
                />
            </Form.Group>
            <Form.Input
                fluid
                type="date"
                placeholder="Birth date"
                onChange={(e, data) => BirthDate(data.value)}
            />
            <Form.Checkbox 
                label="Favorite"
                onChange={(e, data) => Favorite(data.checked)}
                toggle
            />
            <FileInput buttonText="Choose contact photo" onChange={val => Photo(val)} setLoading={Loading} />
            <Button
                fluid
                primary
                type="submit"
                size="large"
                loading={loading}
                disabled={!(mainTelCode && mainTelVal)}
            >
                Add contact
            </Button>
        </Form>
    );
};

export default AddContactForm;
