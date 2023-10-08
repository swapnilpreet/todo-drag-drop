import React from 'react'
import TaskList from './TaskList';
import toast from 'react-hot-toast';
import { useDrop } from 'react-dnd';
import Header from './Header';

const Section = ({ status, tasks, settasks, todos, inProgress, closed }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item) => addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    let text = "Todo";
    let bg = "bg-red-400";
    let countbg = "text-red-800";
    let tasksToMap = todos;
  
    if (status === "inprogress") {
      text = "In Progress";
      bg = "bg-yellow-500";
      countbg = "text-yellow-800";
      tasksToMap = inProgress;
    }
    if (status === "closed") {
      text = "Closed";
      bg = "bg-green-500";
      countbg = "text-green-800";
      tasksToMap = closed;
    }
    const addItemToSection = (id) => {
      console.log("addItemToSection", id, status);
      settasks((prev) => {
        const modifiedTasks = prev?.map((t) => {
          if (t.id === id) {
            return { ...t, status: status };
          }
          return t;
        });
  
        localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
        if (status === "todo") toast("Task Todo", { icon: "🤔" });
        if (status === "inprogress") toast("Task Inprogress", { icon: "😯" });
        if (status === "closed") toast("Task Closed", { icon: "🥳" });
        return modifiedTasks;
      });
    };
    return (
      <div
        ref={drop}
        className={`w-64  rounded-md p-2 ${isOver ? "bg-slate-300" : ""}`}
      >
        <Header
          text={text}
          bg={bg}
          count={tasksToMap?.length}
          countbg={countbg}
        />
        {tasksToMap?.length > 0 &&
          tasksToMap?.map((task) => (
            <TaskList
              key={task.id}
              task={task}
              tasks={tasks}
              settasks={settasks}
            />
          ))}
      </div>
    );
  };
  

export default Section