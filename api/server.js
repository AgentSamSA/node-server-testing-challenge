const express = require("express");

const Kings = require("./kings/kings-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/kings", (req, res) => {
    Kings.get()
        .then(kings => {
            res.status(200).json(kings);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

server.post("/kings", (req, res) => {

});

module.exports = server;