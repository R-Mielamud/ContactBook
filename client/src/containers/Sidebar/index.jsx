import React, { createRef } from "react";
import { Form, Segment, Select, Button, Modal, Grid } from "semantic-ui-react";
import { get } from "../../services/category";
import Spinner from "../../components/Spinner";
import querystring from "querystring";
import AddContactPage from "../AddContactPage";
import CategoriesPage from "../CategoriesPage";
import BirthdaysPage from "../BirthdaysPage";

class Sidebar extends React.Component {
    constructor({ filterDefs }) {
        super();
        this.state = { requested: false, categories: null };
        this.newFilter = filterDefs || {};
        this.addContactTrigger = createRef();
    }

    componentDidMount() {
        if (!this.state.requested) {
            get().then(categories => this.setState({ requested: true, categories }));
        }
    }

    toTop() {
        const interval = setInterval(() => {
            if (window.scrollY <= 10) {
                clearInterval(interval);
            }

            window.scrollBy(0, -20);
        }, 10);
    }

    render() {
        if (!this.state.requested) return <Spinner />

        const { categories } = this.state;

        const categoriesOptions = [
            { key: "", value: "", text: "-" },
            ...categories.map(category => ({
                key: category.name,
                value: category.name,
                text: category.name
            }))
        ];

        return (
            <Grid columns="2">
                <Grid.Column>
                    <Segment style={{ maxWidth: 300, backgroundColor: "black" }}>
                        <Form onSubmit={() => 
                                window.location.href = window.location.origin +
                                "?" +
                                querystring.stringify(this.newFilter)}>
                            <Form.Input
                                fluid
                                icon="users"
                                iconPosition="left"
                                placeholder="First name"
                                onChange={e => this.newFilter.firstName = e.target.value}
                                defaultValue={this.newFilter.firstName || ""}
                            />
                            <Form.Input
                                fluid
                                icon="users"
                                iconPosition="left"
                                placeholder="Last name"
                                onChange={e => this.newFilter.lastName = e.target.value}
                                defaultValue={this.newFilter.lastName || ""}
                            />
                            <Form.Input
                                fluid
                                icon="at"
                                iconPosition="left"
                                placeholder="Email"
                                onChange={e => this.newFilter.mainEmail = e.target.value}
                                defaultValue={this.newFilter.mainEmail || ""}
                            />
                            <Select
                                fluid
                                placeholder="Select category"
                                options={categoriesOptions}
                                onChange={(e, data) => this.newFilter.category = data.value}
                                style={{ marginBottom: 10 }}
                                defaultValue={this.newFilter.category || null}
                            />
                            <Button.Group fluid size="large">
                                <Button
                                    primary
                                    type="submit"
                                >
                                    Filter contacts
                                </Button>
                                <Button.Or />
                                <Button
                                    secondary
                                    inverted
                                    onClick={() => {
                                        this.newFilter = {};
                                        window.location.href = "/";
                                    }}
                                >
                                    Reset filter
                                </Button>
                            </Button.Group>
                        </Form>
                    </Segment>
                    <Button.Group>
                        <Button
                            icon="angle up"
                            positive
                            onClick={this.toTop}
                        />
                        <Button.Or />
                        <Modal openOnTriggerClick closeIcon trigger={<Button primary>Add contact</Button>}>
                            <Modal.Header>
                                Add contact
                            </Modal.Header>
                            <Modal.Content>
                                <AddContactPage categories={categories} />
                            </Modal.Content>
                        </Modal>
                        <Button.Or />
                        <Modal openOnTriggerClick closeIcon trigger={<Button secondary>View categories</Button>}>
                            <Modal.Header>
                                All categories
                            </Modal.Header>
                            <Modal.Content>
                                <CategoriesPage categories={categories} />
                            </Modal.Content>
                        </Modal>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column>
                    <BirthdaysPage />
                </Grid.Column>
            </Grid>
        );
    }
}

export default Sidebar;
