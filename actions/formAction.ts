'use server'

import { Prisma, PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient();

export const addExpense = async (FormData: FormData) => { 
    const expenseTitle = FormData.get("title")
    const expenseAmount = FormData.get("amount")
    const expenseCategory = FormData.get("category") 
    
    const expense = await prisma.expense.create({
        data: {
            title: expenseTitle as string,
            amount: parseFloat(expenseAmount as string),
            category: expenseCategory as string,
        },
    })

    revalidatePath("/expense-tracker")
}

export const deleteExpense = async (expenseId: string) => {
    try {
      // Delete the expense from the database
      await prisma.expense.delete({
        where: {
          id: expenseId,
        },
      });
  
      // Revalidate the cache for the '/expense-tracker' page
      revalidatePath("/expense-tracker");
  
      return { success: true, message: "Expense deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete expense" };
    }
  };