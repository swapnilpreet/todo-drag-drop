import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, settasks }) => {

  const [task, settask] = useState({
    id: "",
    name: "",
    status: "todo",
  });
  // console.log(tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task?.name.length < 3 ) return toast.error('A task must have more than 3 characters')
    if(task?.name.length > 100 ) return toast.error('A task must not be more than 100 characters')
   
    console.log('rev')
    settasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem('tasks', JSON.stringify(list));
      return list;
    });
    toast.success("Task successfully Created")
    settask({
      id: "",
      name: "",
      status: "todo",
    })

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) =>
          settask({...task, id: uuidv4(), name: e.target.value })
        }
        className="border-2 border-slate-400 rounded-lg bg-slate-200 mr-4 h-10 w-64 px-1"
      />
      <button className="bg-green-400 rounded-md px-4 h-10 text-white">
        Add Tasks
      </button>
    </form>
  );
};
export default CreateTask;
