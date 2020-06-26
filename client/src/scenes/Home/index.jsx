import React from "react";
import Routing from "../../containers/Routing";
import { Provider } from "react-redux";
import store from "../../redux/store";

class Home extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Routing />
            </Provider>
        );
    }
}

export default Home;
