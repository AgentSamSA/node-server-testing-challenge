exports.seed = function (knex) {
  return knex("kings")
    .truncate()
    .then(function () {
      return knex("kings").insert([
        { name: "Alfred", country: "Wessex" },
        { name: "Robert the Bruce", country: "Scotland" },
        { name: "Aragon", country: "Gondor" }
      ]);
    });
};
