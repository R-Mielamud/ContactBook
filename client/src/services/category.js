import { request } from "../helpers/api";

export const get = async () => {
    const result = await request({
        url: "/api/category",
        method: "GET"
    });

    return result.categories;
};

export const add = async ({ name, about }) => {
    const result = await request({
        url: "/api/category/register",
        method: "POST",
        body: JSON.stringify({ name, about })
    });

    return result.category;
};

export const update = async (id, { name, about }) => {
    const result = await request({
        url: "/api/category/update",
        method: "PUT",
        body: JSON.stringify({ id, data: { name, about } })
    });

    return result.category;
};

export const deleteCategory = async id => {
    const result = await request({
        url: "/api/category/delete",
        method: "DELETE",
        body: JSON.stringify({ id })
    });

    return result.category;
};
