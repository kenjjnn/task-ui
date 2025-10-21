"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export default function TaskList({ tasks }: { tasks: Todo[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function undo(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API}/todos/${id}/undo`, {
      method: "PATCH",
    });
    startTransition(() => router.refresh());
  }

  async function markDone(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API}/todos/${id}/done`, {
      method: "PATCH",
    });
    startTransition(() => router.refresh());
  }

  async function remove(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API}/todos/${id}`, {
      method: "DELETE",
    });
    startTransition(() => router.refresh());
  }

  return (
    <ul style={{ display: "grid", gap: 8 }}>
      {tasks.map((t) => (
        <li
          key={t.id}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            style={{
              flex: 1,
              textDecoration: t.done ? "line-through" : "none",
            }}
          >
            {t.title}
          </span>

          {t.done ? (
            <>
              <button onClick={() => undo(t.id)} disabled={isPending}>
                ↩ Deshacer
              </button>
              <button onClick={() => remove(t.id)} disabled={isPending}>
                🗑 Borrar
              </button>
            </>
          ) : (
            <button onClick={() => markDone(t.id)} disabled={isPending}>
              ✓ Hecho
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
