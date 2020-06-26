import React from "react";
import { Grid, Sticky, Segment, Header } from "semantic-ui-react";
import Contact from "../../components/Contact";
import { setExpandedContact } from "../../redux/actions";
import { connect } from "react-redux";
import Sidebar from "../Sidebar";

const Contacts = ({ contacts, onContactClick, filterDefs }) => {
    return (
        <Grid columns="2">
            <Grid.Column>
                {contacts.length > 0
                    ? <>{contacts.map(contact => <Contact key={contact._id} contact={contact} onClick={onContactClick}/>)}</>
                    : (
                        <Segment>
                            <Header size="huge" textAlign="center">Oops! No contacts found!</Header>
                        </Segment>
                    )}
            </Grid.Column>
            <Grid.Column stretched>
                <Sticky offset={50}>
                    <Sidebar filterDefs={filterDefs} />
                </Sticky>
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onContactClick: contact => () => dispatch(setExpandedContact(contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
