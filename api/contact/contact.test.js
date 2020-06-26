const server = require("../../index");
const supertest = require("supertest");

describe("Contact tests", () => {
    let TOKEN = null;
    let ID = null;

    it("should create contact", async () => {
        const loginResult = await supertest(server)
            .post("/api/user/login")
            .send({
                email: "2m.roman2@gmail.com",
                password: "123456"
            });

        TOKEN = loginResult.body.token;

        const res = await supertest(server)
            .post("/api/contact/register")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                firstName: "A",
                lastName: "B",
                mainTelephone: {
                    code: "+000",
                    value: "111111111"
                },
                category: "5ef5c19dba4ce103e2194bbc",
                about: "About info",
                birthDate: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate() + 1)
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.contact.firstName).toBe("A");
        ID = res.body.contact._id;
    });

    it("should update contact", async () => {
        const res = await supertest(server)
            .put("/api/contact/update")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                id: ID,
                data: {
                    lastName: "Last"
                }
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.contact.ok).toBe(1);
    });

    it("should get contacts", async () => {
        const res = await supertest(server)
            .get("/api/contact")
            .set("Authorization", "Bearer " + TOKEN)

        expect(res.statusCode).toBe(200);
        expect(res.body.contacts[0].lastName).toBe("Last");
    });

    it("should get min contacts info", async () => {
        const res = await supertest(server)
            .get("/api/contact/min")
            .set("Authorization", "Bearer " + TOKEN)

        expect(res.statusCode).toBe(200);
        expect(res.body.contacts[0].about).toBe(undefined);
    });

    it("should get one contact info", async () => {
        const res = await supertest(server)
            .get("/api/contact/" + ID)
            .set("Authorization", "Bearer " + TOKEN)

        expect(res.statusCode).toBe(200);
        expect(res.body.contact.about).toBe("About info");
    });

    it("should get contacts' birthdays info", async () => {
        const res = await supertest(server)
            .get("/api/contact/birthdays")
            .set("Authorization", "Bearer " + TOKEN)

        expect(res.statusCode).toBe(200);
        expect(res.body.contacts[0].birthdayStr).toContain("in ");
    });

    it("should delete contact", async () => {
        const res = await supertest(server)
            .delete("/api/contact/delete")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                id: ID
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.contact.state).toBe("deleted");
    });
});
