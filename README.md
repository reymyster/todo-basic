This is a basic To-Do List [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## View Working Demo

https://todo-basic-reymyster.vercel.app

## Goals

- Try out [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) / require 0 client-side javascript

- Try out [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

## Take a Look

Check this file out for the main guts:

```bash
src/app/page.tsx
```

This function sets up the main page layout:
```javascript
function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="py-4 text-center text-3xl">TO DO&apos;S</h1>
      <AddForm />
      <hr className="my-4" />
      <DisplayTodos />
    </main>
  );
}
```

DisplayTodos grabs its own data for display:
```javascript
async function DisplayTodos() {
  const data = await getData();

  return (
    <div className="px-1">
      <ul>
        {data.map((item, index) => (
          <DisplayTodo key={item.id} index={index} item={item} />
        ))}
      </ul>
    </div>
  );
}
```