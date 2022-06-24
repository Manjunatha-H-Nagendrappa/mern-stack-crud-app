const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.post("/create", async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    res.status(422).json("please fill all the fields");
  }

  try {
    const user = await users.findOne({ email: email });

    if (user) {
      res.status(422).json("The user already exist");
    } else {
      const addUser = new users({
        name,
        email,
        phone,
        address,
      });

      await addUser.save();
      res.status(201).json(addUser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/getData", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await users.findById({ _id: id });
    res.status(201).json(oneUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userUpdate = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(userUpdate);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await users.findByIdAndDelete({ _id: id });
    res.status(201).json(userDelete);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
