import React, { createRef, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { uploadImage } from "../../services/image";

const FileInput = ({
    buttonText = "Choose photo",
    types = [".png", ".bmp", ".jpg", ".jpeg"],
    onChange,
    setLoading,
    startUploaded = false
}) => {
    const ref = createRef();
    const [imageText, ImageText] = useState("No image");
    const [avatarUploaded, AvatarUploaded] = useState(startUploaded);

    const upload = e => {
        if (e.target.files[0]) {
            setLoading(true);

            uploadImage(e.target.files[0]).then(({ _id }) => {
                onChange(_id);
                ImageText("Your image is uploaded!");
                setLoading(false);
                AvatarUploaded(true);
            });
        } else {
            onChange(null);
            ImageText("No image");
            AvatarUploaded(false);
        }
    };

    return (
        <>
            <Label color={avatarUploaded ? "green" : "grey"} style={{ marginBottom: 10 }}>{imageText}</Label>
            <Button.Group fluid>
                <Button
                    color="teal"
                    size="large"
                    onClick={() => ref.current.click()}
                    style={{ marginBottom: 10 }}
                    type="button"
                >
                    <Icon name="image" />
                    {buttonText}
                </Button>
                <Button
                    content="Delete image"
                    negative
                    onClick={() => {
                        onChange(null);
                        ImageText("No image");
                        AvatarUploaded(false);
                    }}
                    style={{ marginBottom: 10 }}
                    type="button"
                    disabled={!avatarUploaded}
                />
            </Button.Group>
            <input
                type="file"
                style={{ display: "none" }}
                ref={ref}
                accept={types.join(", ")}
                onChange={upload}
            />
        </>
    );
};

export default FileInput;
