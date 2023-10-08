import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./Compoents/CreateTask";
import ListOfTask from "./Compoents/ListOfTask";
// import { parse } from "uuid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() {
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    const data=JSON.parse(localStorage.getItem("tasks")) || [] 
    console.log(data,'data');
    settasks(data);
  }, []);

  console.log("home",tasks)
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-slate-200 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
        <CreateTask tasks={tasks} settasks={settasks} />
        <ListOfTask tasks={tasks} settasks={settasks} />
      </div>
    </DndProvider>
  );
}

export default App;
