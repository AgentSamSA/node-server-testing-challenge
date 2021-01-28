it("is the correct env", () => {
    expect(process.env.DB_ENV).toBe("testing");
});

const Kings = require("./kings-model");
const db = require("../../data/dbConfig");

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

describe("kings model", () => {
    describe("insert function", () => {
        it("adds kings to db", async () => {
            let allKings;
            Kings.insert(aragorn);
            allKings = await db("kings");
            expect(allKings).toHaveLength(1);

            Kings.insert(alfred);
            allKings = await db("kings");
            expect(allKings).toHaveLength(2);
        });
        it("resolves to added king", async () => {
            const king = await Kings.insert(aragorn);
            expect(king).toMatchObject({ id: 1, ...aragorn });
        });
    });
    describe("get function", () => {
        it("gets kings from db", async () => {
            Kings.insert(aragorn);
            Kings.insert(alfred);
            const allKings = await Kings.get();
            expect(allKings).toHaveLength(2);
        });
    });
    describe("update function", () => {
        it()
    });
});