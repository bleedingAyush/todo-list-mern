const express = require("express");
const router = express.Router();
const Session = require("supertokens-node/recipe/session");
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");
const Todo = require("./model/todo");

router.route("/todo").post(verifySession(), async (req, res, next) => {
  try {
    const userId = req.session?.getUserId();
    const { todo } = req.body;
    if (!todo) {
      res.json({ error: "Please give the todo" });
    }
    const data = await Todo.create({
      userId,
      todo,
    });
    res.status(200).json({ data });
  } catch (err) {
    next(new Error(err.message));
  }
});

router.route("/todos").get(verifySession(), async (req, res, next) => {
  try {
    const userId = req.session?.getUserId();
    const data = await Todo.find({
      userId,
    }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    next(new Error(err.message));
  }
});

router.route("/delete").post(verifySession(), async (req, res, next) => {
  try {
    const { _id } = req.query;
    const data = await Todo.deleteOne({
      _id,
    });
    res.json({ _id, ...data });
  } catch (err) {
    next(new Error(err.message));
  }
});

router.route("/completeTodo").post(verifySession(), async (req, res, next) => {
  const { _id, isCompleted } = req.query;

  try {
    const todo = await Todo.findOne({
      _id,
    });
    const data = await todo.updateOne({
      isCompleted,
    });
    res.json(data);
  } catch (err) {
    next(new Error(err.message));
  }
});

module.exports = router;
