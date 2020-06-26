import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class Spinner extends React.Component {
    render() {
        return (
            <Dimmer active inverted>
                <Loader size="massive" inverted />
            </Dimmer>
        );
    }
}

export default Spinner;
