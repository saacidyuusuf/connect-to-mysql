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
  const [rows] = await pool.query("select * from classes");
  return rows;
}

export async function getClass(id) {
  const [rows] = await pool.query(`select *
   from classes
   where classid =  ?
   `,[id])
  return rows[0];
}


export async function CreateClass(classId,className,subjectId,teacherId,date_ka,day_ka){
 const [result] = await pool.query(` insert into classes
  (classId,className,subjectId,teacherId,date_ka,day_ka)
  values (?,?,?,?,?,?)
  `,[classId,className,subjectId,teacherId,date_ka,day_ka])
  const id = result.insertId
  //this is the id of the class that is inserted
  return getClass(id)
}

//if i want to insert object into database
//and also view that object as it apears in db
//id ,default value like authincrement
//u have to run another query to get that object
//from the databse


const classes = await getClasses();
const singleClass = await getClass(2);
const CreateResult = await CreateClass(40,'ca229',2,2,null,null);




