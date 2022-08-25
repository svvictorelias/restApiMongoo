const express = require('express');
const Model = require('../model/model');

const router = express.Router();

router.post('/post', async (req, res) => {
  const { name, age } = req.body;
  const data = new Model({
    name,
    age
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getOne/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const  updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const {id} = req.params
    const data = await Model.findByIdAndDelete(id)
    res.send(`The user ${data.name} has been deleted`)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
