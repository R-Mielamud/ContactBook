import { SET_PROFILE, SET_EXP_CONTACT } from "./types";

export const profile = (state = {}, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
};

export const contacts = (state = {}, action) => {
    switch (action.type) {
        case SET_EXP_CONTACT:
            return {
                ...state,
                expanded: action.contact
            };
        default:
            return state;
    }
};
