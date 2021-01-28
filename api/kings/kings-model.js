const db = require("../../data/dbConfig");

module.exports = {
    get,
    insert,
    update,
    remove
};

function get() {
    return db("kings");
}

async function insert(king) {
    const [id] = await db("kings").insert(king);
    return db("kings").where("id", id).first();
}

async function update(id, changes) {
    return db("kings").update(changes).where("id", id);
}

function remove(id) {

}