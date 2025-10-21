// lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API!;

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',    // evita cache en Vercel
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`[${res.status}] ${msg || res.statusText}`);
  }
  return res.json();
}

export const api = {
  list: () => http<Todo[]>(`${BASE}/todos`),
  create: (title: string) =>
    http<Todo>(`${BASE}/todos`, { method: 'POST', body: JSON.stringify({ title }) }),
  toggle: (id: string) =>
    http<Todo>(`${BASE}/todos/${id}/toggle`, { method: 'PATCH' }),
  remove: (id: string) =>
    http<{ ok: true }>(`${BASE}/todos/${id}`, { method: 'DELETE' }),
};
