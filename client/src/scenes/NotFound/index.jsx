import React from "react";
import { Grid, Header, Button } from "semantic-ui-react";

const NotFound = () => {
    document.body.style.backgroundColor = "black";

    return (
        <Grid centered columns="1" textAlign="center" verticalAlign="middle" className="fill">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color="red" size="huge" textAlign="center" inverted>404 Page not found</Header>
                <Button
                    positive
                    compact
                    size="massive"
                    fluid
                    onClick={() => window.location.href = "/"}
                >
                    Back, to home
                </Button>
            </Grid.Column>
        </Grid>
    );
};

export default NotFound;
