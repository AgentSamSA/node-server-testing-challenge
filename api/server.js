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
    Kings.insert(req.body)
        .then(king => {
            res.status(201).json(king);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

module.exports = server;