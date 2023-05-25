import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

async function getData() {
  const { rows } =
    await sql`SELECT id, title, completed FROM todos WHERE completed = ${0} ORDER BY id ASC`;

  return rows.map((r) => ({
    id: r.id as number,
    title: r.title as string,
    completed: r.completed === "1",
  }));
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="py-4 text-center text-3xl">TO DO&apos;S</h1>
      <AddForm />
      <hr className="my-4" />
      <div className="px-8">
        <ul className="list-disc">
          {data.map((item) => (
            <li key={item.id} className="p-2">
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function AddForm() {
  async function addItem(formData: FormData) {
    "use server";
    const newTodo = formData.get("todo")?.toString();
    await sql`INSERT INTO todos (title, completed) VALUES (${newTodo}, '0')`;
    revalidatePath("/");
  }

  return (
    <form action={addItem}>
      <div className="flex flex-row justify-between">
        <div className="grow p-2">
          <input
            className="form-input w-full rounded-md text-black"
            type="text"
            id="todo"
            name="todo"
            placeholder="To do..."
            maxLength={250}
            required={true}
          />
        </div>
        <div className="flex grow-0 content-center justify-center p-2">
          <button
            type="submit"
            className="rounded-md bg-white/80 p-1 px-4 text-black/80 duration-75 hover:bg-white hover:text-black"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
