import { request } from "../helpers/api";

export const login = async ({ email, password }) => {
    const result = await request({
        method: "POST",
        url: `/api/user/login`,
        body: JSON.stringify({ email, password })
    });

    return result;
};

export const register = async settings => {
    const result = await request({
        method: "POST",
        url: `/api/user/register`,
        body: JSON.stringify(settings)
    });

    return result;
};

export const update = async settings => {
    const result = await request({
        method: "PUT",
        url: `/api/user/update`,
        body: JSON.stringify(settings)
    });

    return result;
};

export const logout = async () => {
    const result = await request({
        method: "POST",
        url: `/api/user/logout`
    });

    return result;
};

export const profile = async email => {
    const result = await request({
        method: "GET",
        url: `/api/user/profile?email=${email}`
    });

    return result;
};
