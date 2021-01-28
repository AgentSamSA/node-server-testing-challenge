const db = require("../../data/dbConfig");

module.exports = {
    get,
    insert,
    remove
}

function get() {

}

async function insert(king) {
    const [id] = await db("kings").insert(king);
    return db("kings").where("id", id).first();
}

function remove(id) {

}