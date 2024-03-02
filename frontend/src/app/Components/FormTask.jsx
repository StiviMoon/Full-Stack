"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const FormTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/`,
      {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    // Limpiar los campos de texto
    setTitle("");
    setDescription("");
    router.refresh();
  };

  return (
    <div className="bg-slate-200 p-7 h-fit">
      <h1 className="text-black font-bold text-lg pb-5 text-center">
        Añadir Tareas
      </h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="title"
          className="text-black text-sm">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={title}
          className="text-black bg-slate-400 w-full rounded-md p-2  mb-2 block"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          htmlFor="description"
          className="text-black text-sm">
          Description:
        </label>
        <textarea
          name="description"
          value={description}
          className="text-black bg-slate-400 w-full rounded-md p-2  mb-2 block "
          onChange={(e) => setDescription(e.target.value)}></textarea>

        <button className="bg-green-400 mt-2 p-2 w-full rounded-lg">
          Save
        </button>
      </form>
    </div>
  );
};
