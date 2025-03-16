const ToDo = require("../models/ToDoList");

exports.createToDo = async (req, res) => {
  try {
    const data = req.body;
    const todo = new ToDo(data);
    await todo.save();
    res.status(201).send({ message: "Tạo thành công" });
  } catch (err) {
    console.log(err);
    res.status(err);
  }
};

exports.getAllToDo = async (req, res) => {
  try {
    let { userId } = req.params;
    const result = await ToDo.find({ createdBy: userId });
    res.send(result);
  } catch (err) {
    res.status(404).send({ message: "Không tìm thấy" });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ToDo.findByIdAndDelete(id);
    console.log(result);
    res.status(200).send({ message: "Xóa thành công" });
  } catch (err) {
    res.status(404).send({ message: "Không tìm thấy" });
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await ToDo.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.status(200).send({ message: "Sửa thành công" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Không tìm thấy" });
  }
};
