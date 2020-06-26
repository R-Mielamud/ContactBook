function stripEmpty(value) {
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            const val = value[i];

            if (val === "" || val === null || val === undefined) {
                value.splice(value.indexOf(val), 1);
                i--;
            } else if (Array.isArray(val) || typeof val === "object") {
                const canDelete = stripEmpty(val);

                if (canDelete[0]) {
                    if (Array.isArray(value)) {
                        value.splice(value.indexOf(val), 1);
                        delete val;
                    } else {
                        delete value[key];
                        delete val;
                    }
                }
            }
        }
    } else if (typeof value === "object" && value !== null) {
        for (const [key, val] of Object.entries(value)) {
            if (val === "" || val === null || val === undefined) {
                delete value[key];
            } else if (Array.isArray(val) || typeof val === "object") {
                const canDelete = stripEmpty(val);

                if (canDelete[0]) {
                    if (Array.isArray(value)) {
                        value.splice(value.indexOf(val), 1);
                        delete val;
                    } else {
                        delete value[key];
                        delete val;
                    }
                }
            }
        }
    }

    return [value.length ? value.length === 0 : Object.keys(value).length === 0, value];
}

module.exports = stripEmpty;
