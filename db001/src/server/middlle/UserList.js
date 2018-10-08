const express = require('express');
const Router = require('express-promise-router');
const router = new Router();

const db = require('../db/query');

router.get("/userId/:name", async (req, res) => {
    const { name } = req.params;
    const { rows } = await db.query("SELECT user_id from USER_LIST where name = $1", [name]);
    res.send(rows);
});

module.exports = router;
