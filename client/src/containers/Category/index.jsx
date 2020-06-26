import React from "react";
import { Segment, Grid, Header, Statistic, Button, Modal } from "semantic-ui-react";
import UpdateCategoryForm from "../../components/UpdateCategoryForm";
import { connect } from "react-redux"
import { deleteCategory } from "../../services/category";

const Category = ({ category, user }) => {
    const Delete = async () => {
        if (category.contactsCount !== 0) {
            return alert(
                "Change category from " +
                category.name +
                " to another in " +
                category.contactsCount +
                " contact" +
                (category.contactsCount !== 1 ? "s" : "") +
                " and then try again. Good luck!\nPRO TIP: use filter"
            );
        }

        await deleteCategory(category._id);
        window.location.reload();
    };

    return (
        <Segment>
            <Grid columns="4" textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    <Header>{category.name}</Header>
                </Grid.Column>
                <Grid.Column>
                    <Statistic
                        size="tiny"
                        value={category.contactsCount}
                        label={"contact" + (category.contactsCount !== 1 ? "s" : "")}
                    />
                </Grid.Column>
                <Grid.Column>
                    {category.about}
                </Grid.Column>
                {user._id === category.user ? (
                    <Grid.Column>
                        <Button.Group>
                            <Modal openOnTriggerClick closeIcon trigger={<Button icon="refresh" color="yellow" />}>
                                <Modal.Header>Update {category.name} category</Modal.Header>
                                <Modal.Content>
                                    <UpdateCategoryForm defs={category} id={category._id} />
                                </Modal.Content>
                            </Modal>
                            <Modal openOnTriggerClick closeIcon trigger={<Button icon="trash" negative />}>
                                <Modal.Header>Are you sure?</Modal.Header>
                                <Modal.Content>
                                    Are you sure about deleting {category.name} category?
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button negative onClick={Delete}>Yes</Button>
                                </Modal.Actions>
                            </Modal>
                        </Button.Group>
                    </Grid.Column>
                ) : ""}
            </Grid>
        </Segment>
    );
};

const mapStateToProps = state => ({
    user: state.profile.profile
});

export default connect(mapStateToProps)(Category);
