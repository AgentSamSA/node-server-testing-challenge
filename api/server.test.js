it("is the correct env", () => {
    expect(process.env.DB_ENV).toBe("testing");
});

const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const aragorn = { name: "aragon", country: "gondor" };
const alfred = { name: "alfred", country: "wessex" };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("kings").truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe("server", () => {
    describe("[GET] /kings", () => {
        it("responds with 200 OK", async () => {
            const res = await request(server).get("/kings");
            expect(res.status).toBe(200);
        });
        it("returns the right number of kings", async () => {
            let res;
            await db("kings").insert(aragorn);
            res = await request(server).get("/kings");
            expect(res.body).toHaveLength(1);

            await db("kings").insert(alfred);
            res = await request(server).get("/kings");
            expect(res.body).toHaveLength(2);
        });
        it("returns the right kings", async () => {
            let res;
            await db("kings").insert(aragorn);
            await db("kings").insert(alfred);
            res = await request(server).get("/kings");
            expect(res.body[0]).toMatchObject({ id: 1, ...aragorn });
            expect(res.body[1]).toMatchObject({ id: 2, ...alfred });
        });
    });
});