const express = require('express');
const Router = require('express-promise-router');
const router = new Router();

const db = require('../db/query');

// Userのtodoを取得
router.get("/todo/:userId", async (req, res) => {
    const { userId } = req.params;
    const { rows } = await db.query("SELECT id, todo, memo, isDone from TODO_LIST where user_id = $1 order by id", [userId]);
    res.send(rows);
});

// UserのTodoの状態を変更
router.get("/updateTodo/:todoId", async (req, res) => {
    const {todoId} = req.params;
    const {rows} = await db.query("UPDATE TODO_LIST set isdone = TRUE WHERE id = $1", [todoId]);
    res.send(rows);
});

// UserのTodoを追加
router.post("/addTodo", async(req, res) => {
    const body = req.body;
    const userId = body.userId;
    const todo = body.todo;
    const memo = body.memo;
    const values = [userId, todo, memo];
    try {
        const {rows} = await db.query("INSERT INTO TODO_LIST(user_id, todo, memo) VALUES($1, $2, $3)RETURNING *", values);
    } catch (e) {
        res.status(500).send({error: "ER-0001", stack: e.stack});
    }
});

module.exports = router;
