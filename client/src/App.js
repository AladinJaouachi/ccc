import { useEffect, useState } from "react";
import Head from "./components/Head.jsx";
import Menu from "./components/Menu.jsx";
import Tools from "./components/Tools.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, settodos] = useState([]);
  const [filtred, setfiltred] = useState([]);
  const gettodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/all`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        settodos(data.Response);
        setfiltred(data.Response);
        console.log("mregel");
      } else {
        console.log("failed get data error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettodos();
  }, []);
  return (
    <>
      <Head settodos={settodos} todos={todos} setfiltred={setfiltred} />
      <Tools />
      <Menu filtred={filtred} />
    </>
  );
}

export default App;
