import CreateForm from "./CreateForm";
import TaskList from "./TaskList";

async function getTasks() {
  const base = process.env.NEXT_PUBLIC_API!;
  const res = await fetch(`${base}/todos`, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudieron obtener tareas");
  return res.json();
}

export default async function Page() {
  const tasks = await getTasks();
  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Tasks</h1>
      <TaskList tasks={tasks} />
      
      <CreateForm />
    </main>
  );
}

