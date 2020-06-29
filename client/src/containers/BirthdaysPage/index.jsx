import React from "react";
import { Segment, List, Header } from "semantic-ui-react";
import { getBirthdays } from "../../services/contact";

class BirthdaysPage extends React.Component {
    constructor() {
        super();

        this.state = {
            requested: false,
            birthdays: []
        };
    }

    componentDidMount() {
        if (!this.state.requested) {
            getBirthdays().then(birthdays => this.setState({ requested: true, birthdays }));
        }
    }

    render() {
        if (this.state.requested) {
            const getContactName = contact => {
                if (contact.firstName || contact.lastName) {
                    return (contact.firstName || "") + " " + (contact.lastName || "");
                } else {
                    return contact.mainTelephone.code + contact.mainTelephone.value;
                }
            };

            return (
                <Segment textAlign="center" style={{
                    backgroundBlendMode: "overlay",
                    backgroundImage: "url('https://i.pinimg.com/474x/7a/bb/e0/7abbe0f43c47ba3340053bd825251995--neon-lights-party-glow-party.jpg')",backgroundColor: "#000B"
                }}>
                    <Header size="large" color="olive">Coming birthdays</Header>
                    <List>
                        {this.state.birthdays.length > 0 ? this.state.birthdays.map(contact => (
                            <List.Item key={contact._id}>
                                <Header size="small" color="green">
                                    {getContactName(contact)}
                                    <Header.Subheader style={{ color: "yellow" }}>{contact.birthdayStr}</Header.Subheader>
                                </Header>
                            </List.Item>
                        )) : <Header size="medium" style={{ color: "white" }}>No birthdays</Header>}
                    </List>
                </Segment>
            );
        } else {
            return "";
        }
    }
}

export default BirthdaysPage;
