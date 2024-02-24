import express from 'express';
import cors from "cors";
const app = express();
import { getClass, getClasses, CreateClass } from "./database.js";

app.use(cors())
app.use(express.urlencoded({extended: false}))

app.get("/classes", async (req, res) => {
  const classes = await getClasses();
  res.status(200).json((classes));
});

app.get("/classes:id", async (req, res) => {
  const id = req.params.id;
  if(!id){
    return res.status(404).json({message: 'no id'})
  }
  const singleClass = await getClass(id);
  if(!singleClass) return res.status(404).json({message: 'error getting single class'});
  res.status(200).json((singleClass));
});

app.post("/classes", async (req, res) => {
  const { className, subjectId, teacherId} = req.body;
  const createClass = CreateClass(
    className,
    subjectId,
    teacherId,
  );
  res.status(201).send(createClass);
});





app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("something went wrong");
});

app.listen(4000, () => {
  console.log("listening on port 5000");
});

/* 
 npm i "express@>=5.0.0-beta.1" --save
express 5  has async express handler
which allows us to write async code that could
couse an error and we can handle that error
in single location
*/



/* 

const db = mysql.creatConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'classes'
})


app.get('/classes', (req, res) => {
  const sql = "select * from classes"
  db.query(sql, (err, data) => {
    if(err){
      return res.json(err)
    }
    return res.json(data)
  })
})




*/