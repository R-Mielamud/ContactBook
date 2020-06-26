const server = require("../../index");
const supertest = require("supertest");

describe("Category tests", () => {
    let TOKEN = null;
    let ID = null;

    it("should create category", async () => {
        const loginResult = await supertest(server)
            .post("/api/user/login")
            .send({
                email: "2m.roman2@gmail.com",
                password: "123456"
            });

        TOKEN = loginResult.body.token;

        const res = await supertest(server)
            .post("/api/category/register")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                name: "Category",
                about: "About"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.category.name).toBe("Category");
        ID = res.body.category._id;
    });

    it("should update category", async () => {
        const res = await supertest(server)
            .put("/api/category/update")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                id: ID,
                data: {
                    name: "Category2"
                }
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.category.ok).toBe(1);
    });

    it("should get categories", async () => {
        const res = await supertest(server)
            .get("/api/category")
            .set("Authorization", "Bearer " + TOKEN)

        expect(res.statusCode).toBe(200);
        expect(res.body.categories[1].name).toBe("Category2");
    });

    it("should delete category", async () => {
        const res = await supertest(server)
            .delete("/api/category/delete")
            .set("Authorization", "Bearer " + TOKEN)
            .send({
                id: ID
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.category.state).toBe("deleted");
    });
});
