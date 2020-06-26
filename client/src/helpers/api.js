export const request = async ({ method, url, body, type = "application/json" }) => {
    const result = await fetch(url, {
        method,
        headers: {
            ...(type ? { "Content-Type": type } : {})
        },
        ...(body ? { body } : {})
    }).then(res => res.json());

    return result;
};