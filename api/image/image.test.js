const server = require("../../index");
const supertest = require("supertest");
const path = require("path");

describe("Image test", () => {
    it("should create image", async () => {
        const { body: { token } } = await supertest(server)
            .post("/api/user/login")
            .send({
                email: "2m.roman2@gmail.com",
                password: "123456"
            });

        const res = await supertest(server)
            .post("/api/image/register")
            .set("Authorization", "Bearer " + token)
            .set("Content-Type", "multipart/form-data")
            .attach("image", path.join(__dirname, "testFiles", "avatar_default.png"))

        expect(res.statusCode).toBe(200);
    });

    console.warn("DON'T FORGET TO CLEAR DATABASE AFTER TESTS");
});
