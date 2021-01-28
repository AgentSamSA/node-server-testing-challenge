exports.up = function (knex) {
    return knex.schema.createTable("kings", tbl => {
        tbl.increments();

        tbl.string("name", 255).unique().notNullable();
        tbl.string("country", 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("kings");
};
