const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const toDoRouter = require("./routes/ToDoRouter");
require("dotenv").config();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// APi
app.use("/api", authRoutes);
app.use("/api/todo", toDoRouter);

//Kết nối mongodb
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
