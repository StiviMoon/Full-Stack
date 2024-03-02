"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

//React Icons
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar esta tarea?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleDone = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${id}/done/`,
      {
        method: "POST",
      }
    );
    if (res.status === 200) {
      router.refresh();
    }
  };

  const hundleUpdate = async (id) => {
    console.log(id);
    console.log(newTitle, newDescription);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: newTitle, description: newDescription }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setNewTitle(data.title);
    setNewDescription(data.description);

    setEdit(!edit);
  };

  return (
    <div className="bg-slate-500 px-4 py-3 rounded-md m-4 flex justify-between items-center">
      <div className="flex flex-col">
        {!edit ? (
          <h2 className="text-xl font-semibold flex justify-betwen items-center ">
            {" "}
            {newTitle}
          </h2>
        ) : (
          <input
            className="border-none text-xl  bg-slate-500 outline-none"
            type="text"
            placeholder={task.title}
            onChange={(e) => setNewTitle(e.target.value)}></input>
        )}
        {!edit ? (
          <p className="mt-2 text-lg font-sans"> {newDescription} </p>
        ) : (
          <textarea
            rows={1}
            className="mt-2 text-lg font-sans border-none bg-slate-500 outline-none w-full"
            onChange={(e) => setNewDescription(e.target.value)}>
            {task.description}
          </textarea>
        )}
      </div>
      <div className="flex justify-between gap-x-4">
        <button onClick={() => handleDone(task.id)}>
          {task.done ? (
            <MdCheckBox className="text-3xl" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-3xl" />
          )}
        </button>
        {edit && (
          <button
            className="bg-slate-300 text-black rounded-md p-2"
            onClick={() => hundleUpdate(task.id)}>
            Guardar
          </button>
        )}
        <button
          className="bg-indigo-500 p-2 rounded-lg"
          onClick={() => setEdit(!edit)}>
          Editar
        </button>
        <button
          className="bg-red-600 p-2 rounded-lg"
          onClick={() => handleDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
