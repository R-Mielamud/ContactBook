import { request } from "../helpers/api";

export const uploadImage = async image => {
    const data = new FormData();
    data.append("image", image);

    const result = await request({
        url: `/api/image/register`,
        method: "POST",
        type: null,
        body: data
    });

    return result.image;
};
