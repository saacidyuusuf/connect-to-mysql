const express = require("express");

const app = express();

import { getClass, getClasses, CreateClass } from "./database";

app.use(express.urlencoded({extended: false}))

app.get("/classes", async (req, res) => {
  const classes = await getClasses();
  req.send(classes);
});

app.get("/classes:id", async (req, res) => {
  const id = req.params.id;
  const singleClass = await getClass(id);
  req.send(singleClass);
});

app.post("/classes", async (req, res) => {
  const { className, subjectId, teacherId, date_ka, day_ka } = req.body;
  const createClass = CreateClass(
    className,
    subjectId,
    teacherId,
    date_ka,
    day_ka
  );
  res.status(201).send(createClass);
});





app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("something went wrong");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

/* 
 npm i "express@>=5.0.0-beta.1" --save
express 5  has async express handler
which allows us to write async code that could
couse an error and we can handle that error
in single location
*/
