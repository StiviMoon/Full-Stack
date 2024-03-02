import React from "react";
import { TaskCard } from "./TaskCard";



async function loadTasks() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/task/`);
  const task = await res.json();
  return task;
}

async function ListTasks() {
  const task = await loadTasks();
  console.log(task);

  return (
    <div className="bg-gray-200 w-full">
      <h1 className="text-black text-center text-lg p-5 font-bold">
        ListTasks
      </h1>

      {task.map((task) => (
        <TaskCard task={task} key={task.id}/>
      ))}
    </div>
  );
}

export default ListTasks;
