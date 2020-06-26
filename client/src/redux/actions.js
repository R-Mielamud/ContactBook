import { SET_PROFILE, SET_EXP_CONTACT } from "./types";

export const setProfile = profile => ({
    type: SET_PROFILE,
    profile
});

export const setExpandedContact = contact => ({
    type: SET_EXP_CONTACT,
    contact
});
