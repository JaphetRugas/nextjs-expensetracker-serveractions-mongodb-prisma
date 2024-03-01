"use client";

import { useFormStatus } from "react-dom";

export function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Adding" : "Add Expense" }
    </button>
  );
}
