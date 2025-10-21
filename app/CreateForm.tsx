"use client";
import { useState } from "react";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/todos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        setLoading(false);
        if (res.ok) {
          setTitle("");
          location.reload(); // refresca la lista
        } else {
          alert("Error creando tarea");
        }
      }}
      style={{ display: "flex", gap: 8 }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
        style={{ flex: 1, padding: 8 }}
      />
      <button disabled={loading || !title} type="submit">
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}
