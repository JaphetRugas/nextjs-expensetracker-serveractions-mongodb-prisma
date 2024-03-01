import Form from "@/components/Form";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const ExpenseTrackerPage = async () => {
  const expenses = await prisma.expense.findMany();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-xl mx-auto flex">
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
          <h2 className="text-xl font-semibold mb-2">Expenses Listed</h2>
          <Form />
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-2">Expenses</h2>
          <div className="h-96 overflow-y-auto">
            <ul>
              {expenses.map((expense) => (
                <li
                  key={expense.id}
                  className="border border-gray-300 rounded p-4 mb-4"
                >
                  <p className="text-lg font-medium">{expense.title}</p>
                  <p className="text-sm text-gray-600">Amount: ₱{expense.amount}</p>
                  <p className="text-sm text-gray-600">
                    Category: {expense.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrackerPage;
