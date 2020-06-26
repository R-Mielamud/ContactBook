import React from "react";
import { Header, Image } from "semantic-ui-react";

const Logo = ({ noImage = false }) => {
    return (
        <Header as="h2" color="teal" size="huge" style={{ marginBottom: 50 }} >
            {!noImage ? <Image src="http://s1.iconbird.com/ico/2013/7/390/w256h2561372777054AddressBook.png" alt="book" /> : ""}
            <br />
            Contact Book
            <Header.Subheader>
                A notebook for your contacts
            </Header.Subheader>
        </Header>
    );
};

export default Logo;
