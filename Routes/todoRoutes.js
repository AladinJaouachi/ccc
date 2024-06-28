import express from "express";
import todo from "../models/todomodel.js";

const router = express.Router();

// add todo
router.post("/add", async (req, res) => {
  const { titre } = req.body;
  try {
    const addtodo = new todo({ titre });
    await addtodo.save();
    res.status(200).send({ msg: "todo added successfully", Response: addtodo });
  } catch (error) {
    res.status(500).send({ msg: "error adding", Response: error });
  }
});
//

// delete todo
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await todo.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ msg: "todo deleted successfully", Response: deleted });
  } catch (error) {
    res.status(500).send({ msg: "failed delete todo", Response: error });
  }
});

//

//  update todo

router.put("/modif/:id", async (req, res) => {
  try {
    const modiftodo = await todo.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    modiftodo.modifiedCount
      ? res.status(200).send({ msg: "success", Response: modiftodo })
      : res.status(400).send({ msg: "already modified " });
  } catch (error) {
    res.status(500).send({ msg: "failed update todo ", Response: error });
  }
});
//

// get todos
router.get("/all", async (req, res) => {
  try {
    const alltodos = await todo.find();
    if (alltodos.length > 0) {
      res.status(200).send({ msg: "getted todos", Response: alltodos });
    } else {
      res.status(400).send({ msg: "no todos to get " });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed update todo ", Response: error });
  }
});

//

// delete all todos

router.delete("/lkol", async (req, res) => {
  try {
    const effac = await todo.deleteMany();
    effac.deletedCount > 0
      ? res.status(200).send({ msg: "success", Response: effac })
      : res.status(400).send({ msg: "already deleted " });
  } catch (error) {
    res.status(500).send({ msg: "failed restart todo ", Response: error });
  }
});

//
export default router;
