exports.string = {
    base: {
        type: String,
        trim: true
    },
    required: {
        type: String,
        trim: true,
        required: true
    },
    telephone: {
        code: {
            type: String,
            trim: true
        },
        value: {
            type: String,
            trim: true
        }
    },
    telephoneReq: {
        code: {
            type: String,
            trim: true,
            required: true
        },
        value: {
            type: String,
            trim: true,
            required: true
        }
    }
};
