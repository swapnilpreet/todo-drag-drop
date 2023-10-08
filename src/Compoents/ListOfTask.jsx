import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListOfTask = ({ tasks, settasks }) => {
  const [todos, settodos] = useState([]);
  const [inProgress, setinprogress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const ftodos =tasks?.filter((task) => task?.status === "todo");
    const fprogress = tasks?.filter((task) => task?.status === "inprogress");
    const fClosed = tasks?.filter((task) => task?.status === "closed");

    settodos(ftodos);
    setinprogress(fprogress);
    setClosed(fClosed);

  }, [tasks]);

  
  console.log(todos,inProgress,closed);

  const statusTabs = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statusTabs.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          settasks={settasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

const Section = ({ status, tasks, settasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item)=>addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

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
  const addItemToSection=(id)=>{
    console.log("addItemToSection",id,status)
    settasks((prev)=>{
      const modifiedTasks = prev.map((t)=>{
        if(t.id === id) {
          return {...t,status:status}
        }
        return t;
      });

      localStorage.setItem('tasks',JSON.stringify(modifiedTasks));
     if(status === 'todo')  toast('Task status updated',{icon:"🤔"})
     if(status === 'inprogress')  toast('Task status updated',{icon:"😯"})
     if(status === 'closed')  toast('Task status updated',{icon:"🥳"})
      return modifiedTasks;
    })
  }
  return (
    <div ref={drop} className={`w-64  rounded-md p-2 ${isOver ? 'bg-slate-300': ""}`}>
      <Header text={text} bg={bg} count={tasksToMap?.length} countbg={countbg}/> 
      {tasksToMap?.length > 0 && tasksToMap?.map((task)=>(
        <TaskList key={task.id} task={task} tasks={tasks} settasks={settasks}/>
      ))}
    </div>
  );
};

const Header = ({ text, bg, count ,countbg}) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md text-sm text-white`}
    >
      {text}
      <div className={`${countbg} ml-2 w-5 h-5 bg-white font-bold rounded-full flex items-center justify-center`}>
        {count}
      </div>
    </div>
  );
};

const TaskList = ({task,tasks , settasks}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item:{id:task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  // console.log(isDragging)

  const handleRemove =(id)=>{
    console.log(id);
    const ftasks =  tasks?.filter((t)=>t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(ftasks));
    settasks(ftasks);
    toast('Task Removed',{icon : "👻"})
  }

  return (
     <div ref={drag} className={` ${isDragging ? "opacity-25" : 'opacity-100'} relative p-4 mt-8 shadow-md rounded-md cursor-grab`} >
        <p>{task.name}</p>
        <button className="absolute bottom-1 right-1 text-red-500" onClick={()=>handleRemove(task.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>
     </div>
  );
};

export default ListOfTask;
