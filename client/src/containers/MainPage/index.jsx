import React from "react";
import SiteHeader from "../SiteHeader";
import { getContacts } from "../../services/contact";
import Contacts from "../Contacts";
import ExpandedContact from "../ExpandedContact";
import querystring from "querystring";

class MainPage extends React.Component {
    constructor({ newExpanded = false, query = undefined }) {
        super();
        this.query = query;
        this.newExpanded = newExpanded;
        this.state = { requested: false, contacts: [] };
    }

    componentDidMount() {
        if (!this.state.requested) {
            getContacts()
                .then(contacts => this.setState({ requested: true, contacts }));
        }
    }

    render() {
        document.title = "Contact Book";
        let contacts;
        const query = this.query !== undefined ? this.query : this.props.location.search;
        const filter = querystring.parse(query.slice(1, query.length));

        if (filter) {
            const {
                firstName: first = "",
                lastName: last = "",
                mainEmail: email = "",
                category: cat = ""
            } = filter;

            contacts = this.state.contacts
                .filter(c => first ? c.firstName.toLowerCase().includes(first.toLowerCase()) : true)
                .filter(c => last ? c.lastName.toLowerCase().includes(last.toLowerCase()) : true)
                .filter(c => email ? c.mainEmail.toLowerCase().includes(email.toLowerCase()) : true)
                .filter(c => cat ? c.category.name.toLowerCase().includes(cat.toLowerCase()) : true);
        } else {
            contacts = this.state.contacts;
        }

        return (
            <>
                <SiteHeader />
                <Contacts contacts={contacts} filterDefs={filter} />
                <ExpandedContact isNew={this.newExpanded} />
            </>
        );
    }
}

export default MainPage;
