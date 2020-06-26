const axios = require("axios");

exports.toImgur = async file => {
    try {
        const { data: { data } } = await axios.post(
            "https://api.imgur.com/3/upload",
            {
                image: file.buffer.toString("base64")
            },
            {
                headers: { Authorization: `Client-ID ${process.env.IMGUR_ID}` }
            }
        );

        return {
            url: data.link,
            hash: data.deletehash
        };
    } catch ({ response: { data: { status, data } } }) {
        throw {
            status,
            message: data.error
        };
    }
};