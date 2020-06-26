const server = require("../../index");
const supertest = require("supertest");

describe("User tests", () => {
    let TOKEN = null;
    let EMAIL = null;

    it("should register user", async () => {
        const res = await supertest(server)
            .post("/api/user/register")
            .send({
                email: "a@a.com",
                password: "bbbbbb"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe("a@a.com");
        TOKEN = res.body.token;
    });

    it("should logout", async () => {
        const res = await supertest(server)
            .post("/api/user/logout")
            .set("Authorization", "Bearer " + TOKEN);

        expect(res.statusCode).toBe(200);
        expect(res.body.user).toBe(null);
    });

    it("should login", async () => {
        const res = await supertest(server)
            .post("/api/user/login")
            .send({
                email: "a@a.com",
                password: "bbbbbb"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe("a@a.com");
        TOKEN = res.body.token;
        EMAIL = res.body.user.email;
    });

    it("should say 'true' if user exists", async () => {
        const res = await supertest(server)
            .get("/api/user/exists?email=" + EMAIL)
            .set("Authorization", "Bearer " + TOKEN);

        expect(res.statusCode).toBe(200);
        expect(res.body.exists).toBe(true);
    });

    console.warn("DON'T FORGET TO CLEAR DATABASE AFTER TESTS");
});
