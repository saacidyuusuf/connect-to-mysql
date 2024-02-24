import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBacend = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBacend();
  }, []);

  return (
    <>
      <h2>hello guys</h2>
      <div>
        {data.map((data) =>(
          <div id={data.id}>
            {console.log(data)}
            <h3>{data.className}</h3>
            <p>{data.subjectName}</p>
            <p>{data.teacherName}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
