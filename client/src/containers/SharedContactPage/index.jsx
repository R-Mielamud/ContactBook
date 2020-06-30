import React from "react";
import MainPage from "../MainPage";
import { getContactById } from "../../services/contact";
import Spinner from "../../components/Spinner";
import { setExpandedContact } from "../../redux/actions";
import { connect } from "react-redux";

class SharedContactPage extends React.Component {
    constructor({ setContact }) {
        super();
        this.setContact = setContact;

        this.state = {
            requested: false
        };
    }

    componentDidMount() {
        if (!this.state.requested) {
            const { id } = this.props.match.params;

            getContactById(id).then(contact => {
                this.setContact(contact);
                this.setState({ requested: true });
            });
        }
    }

    render() {
        if (!this.state.requested) {
            return <Spinner />
        } else {
            return <MainPage newExpanded={true} query={this.props.location.search} />;
        }
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setContact: contact => dispatch(setExpandedContact(contact))
});

export default connect(mapStateToProps, mapDispatchToProps)(SharedContactPage);
