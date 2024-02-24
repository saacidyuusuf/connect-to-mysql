import mysql from "mysql2";
//mysql 2 is much better than mysql package
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

/* const result = await pool.query('select * from classes')
const rows = result[0] */
export async function getClasses() {
  const [rows] = await pool.query("select c.classId,c.className,s.subjectName,t.teacherName from classes c join subjects s on s.subjectId = c.subjectId join teachers t on c.teacherId = t.teacherId");
  return rows;
}

export async function getClass(id) {
  const [rows] = await pool.query(`select *
   from classes
   where classid =  ?
   `,[id])
  return rows[0];
}


export async function CreateClass(className,subjectId,teacherId){
 const [result] = await pool.query(` insert into classes
  (className,subjectId,teacherId)
  values (?,?,?)
  `,[className,subjectId,teacherId])
  const id = result.insertId
  //this is the id of the class that is inserted
  return getClass(id)
}

//if i want to insert object into database
//and also view that object as it apears in db
//id ,default value like authincrement
//u have to run another query to get that object
//from the databse

const singleClass = await getClass(1);

/* const classes = await getClasses();
const CreateResult = await CreateClass('ca211',1,1); */




