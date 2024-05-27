import Image from "next/image";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoForm />
      <TodoList />
    </main>
  );
}
