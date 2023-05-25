import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const user = process.env.POSTGRES_USER;

  try {
    // await sql`DROP TABLE todos;`;
    // console.log("table dropped");
    const { rows: tableRows } =
      await sql`SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';`;
    console.log({ tableRows });
    // await sql`CREATE TABLE todos (id SERIAL PRIMARY KEY, title VARCHAR(250) NOT NULL, completed BIT NOT NULL);`;
    // console.log("table created");
    // await sql`INSERT INTO todos(title, completed) VALUES (${"test"}, ${0});`;
    // console.log("data inserted");
    const { rows: todoRows } = await sql`SELECT * FROM todos;`;
    console.log({ todoRows });
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ success: true });
}
