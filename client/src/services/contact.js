import { request } from "../helpers/api";

export const getContacts = async () => {
    const result = await request({
        url: "/api/contact",
        method: "GET"
    });

    return result.contacts;
};

export const getContactById = async id => {
    const result = await request({
        url: `/api/contact/${id}`,
        method: "GET"
    });

    return result.contact;
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
        url: "/api/contact/birthdays?tz=" + Intl.DateTimeFormat().resolvedOptions().timeZone,
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

export const share = async (id, email) => {
    const result = await request({
        url: "/api/contact/share",
        method: "POST",
        body: JSON.stringify({ id, userEmail: email })
    });

    if (result.message) {
        console.error(result.message);
    }
};
