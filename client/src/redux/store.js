import { createStore, combineReducers } from "redux";
import { profile, contacts } from "./reducers";

const reducer = combineReducers({ profile, contacts });
const user = localStorage.getItem("user");

const store = createStore(
    reducer,
    {
        contacts: {
            expanded: null
        },
        profile: {
            profile: user ? JSON.parse(user) : undefined
        }
    }
);

export default store;
