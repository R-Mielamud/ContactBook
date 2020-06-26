import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import FileInput from "../FileInput";
import EmailField from "../AddContactForm/EmailField";
import TelField from "../AddContactForm/TelField";
import { updateContact } from "../../services/contact";

const UpdateContactForm = ({ categories, id, defs }) => {
    defs.birthDate && (defs.birthDate = new Date(defs.birthDate));
    const [first, First] = useState(defs.firstName || "");
    const [last, Last] = useState(defs.lastName || "");
    const [mainTelCode, MainTelCode] = useState(defs.mainTelephone ? (defs.mainTelephone.code || "") : "");
    const [mainTelVal, MainTelVal] = useState(defs.mainTelephone ? (defs.mainTelephone.value || "") : "");
    const [mainEmail, MainEmail] = useState(defs.mainEmail || "");
    const [category, Category] = useState(defs.category._id || categories[0]._id);
    const [emails, Emails] = useState(defs.emails || []);
    const [tels, Tels] = useState(defs.telephones ? (defs.telephones.map(tel => ({ code: tel.code, value: tel.value }))) : []);
    const __fmt__ = date => date >= 10 ? date : "0" + String(date);
    const __fmt_Y__ = date => date >= 999 ? date : "0".repeat(4 - date.length) + String(date);
    const [birthDate, BirthDate] = useState(defs.birthDate || "");
    const [who, Who] = useState(defs.who || "");
    const [about, About] = useState(defs.about || "");
    const [telegram, Telegram] = useState(defs.messangers ? (defs.messangers.telegram || "") : "");
    const [viber, Viber] = useState(defs.messangers ? (defs.messangers.viber || "") : "");
    const [whatsapp, Whatsapp] = useState(defs.messangers ? (defs.messangers.whatsapp || "") : "");
    const [facebook, Facebook] = useState(defs.messangers ? (defs.messangers.facebook || "") : "");
    const [twitter, Twitter] = useState(defs.messangers ? (defs.messangers.twitter || "") : "");
    const [instagram, Instagram] = useState(defs.messangers ? (defs.messangers.instagram || "") : "");
    const [favorite, Favorite] = useState(defs.favorite || false);
    const [photo, Photo] = useState(defs.photo ? (defs.photo._id || "") : "");
    const [loading, Loading] = useState(false);

    const categoriesOpts = categories.map(cat => ({ key: cat._id, value: cat._id, text: cat.name }));

    const UpdateContact = async () => {
        Loading(true);

        const settings = {
            firstName: first,
            lastName: last,
            mainTelephone: {
                code: mainTelCode,
                value: mainTelVal
            },
            mainEmail,
            category: category,
            emails,
            telephones: tels,
            ...(birthDate ? { 
                birthDate: new Date(
                    (new Date(birthDate)).getFullYear(),
                    (new Date(birthDate)).getMonth() + 1,
                    (new Date(birthDate)).getDate()
                )
            } : {}),
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
            favorite
        };

        settings.photo = photo || "";

        await updateContact(id, settings);

        Loading(false);
        window.location.reload();
    };

    return (
        <Form onSubmit={UpdateContact}>
            <Form.Group>
                <Form.Input
                    width={7}
                    fluid
                    icon="users"
                    iconPosition="left"
                    onChange={e => First(e.target.value)}
                    placeholder="First name"
                    defaultValue={first}
                />
                <Form.Input
                    width={7}
                    fluid
                    icon="users"
                    iconPosition="left"
                    onChange={e => Last(e.target.value)}
                    placeholder="Last name"
                    defaultValue={last}
                />
            </Form.Group>
            <TelField
                onChangeCode={e => MainTelCode(e.target.value)}
                codePlaceholder="Main telephone code"
                onChangeVal={e => MainTelVal(e.target.value)}
                valPlaceholder="Main telephone value"
                valDef={mainTelVal}
                codeDef={mainTelCode}
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
                defaultValue={mainEmail}
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
                defaultValue={who}
            />
            <Form.TextArea
                onChange={e => About(e.target.value)}
                placeholder="About"
                defaultValue={about}
            />
            <Form.Group style={{ width: "100%" }}>
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Telegram"
                    onChange={e => Telegram(e.target.value)}
                    defaultValue={telegram}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Viber"
                    onChange={e => Viber(e.target.value)}
                    defaultValue={viber}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Whatsapp"
                    onChange={e => Whatsapp(e.target.value)}
                    defaultValue={whatsapp}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Facebook"
                    onChange={e => Facebook(e.target.value)}
                    defaultValue={facebook}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Twitter"
                    onChange={e => Twitter(e.target.value)}
                    defaultValue={twitter}
                />
                <Form.Input
                    width={5}
                    fluid
                    placeholder="Instagram"
                    onChange={e => Instagram(e.target.value)}
                    defaultValue={instagram}
                />
            </Form.Group>
            <Form.Input
                fluid
                type="date"
                placeholder="Birth date"
                onChange={(e, data) => BirthDate(data.value)}
                defaultValue={defs.birthDate ? (
                    __fmt_Y__(defs.birthDate.getFullYear()) + "-" +
                    __fmt__(defs.birthDate.getMonth()) + "-" +
                    __fmt__(defs.birthDate.getDate())
                ) : ""}
            />
            <Form.Checkbox 
                label="Favorite"
                onChange={(e, data) => Favorite(data.checked)}
                checked={favorite}
                toggle
            />
            <FileInput
                buttonText="Choose new contact photo"
                onChange={val => Photo(val)}
                setLoading={Loading}
                startUploaded
            />
            <Button
                fluid
                primary
                type="submit"
                size="large"
                loading={loading}
                disabled={!(mainTelCode && mainTelVal)}
            >
                Update contact
            </Button>
        </Form>
    );
};

export default UpdateContactForm;
