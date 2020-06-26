import { request } from "../helpers/api";

export const getContacts = async () => {
    const result = await request({
        url: "/api/contact",
        method: "GET"
    });

    return result.contacts;
};

export const addContact = async settings => {
    const result = await request({
        url: "/api/contact/register",
        method: "POST",
        body: JSON.stringify(settings)
    });

    return result.contact;
};

export const updateContact = async (id, settings) => {
    const result = await request({
        url: "/api/contact/update",
        method: "PUT",
        body: JSON.stringify({ id, data: settings })
    });

    return result.contact;
};

export const getBirthdays = async () => {
    const result = await request({
        url: "/api/contact/birthdays",
        method: "GET"
    });

    return result.contacts;
};

export const deleteContact = async id => {
    const result = await request({
        url: "/api/contact/delete",
        method: "DELETE",
        body: JSON.stringify({ id })
    });

    return result.contact;
};
