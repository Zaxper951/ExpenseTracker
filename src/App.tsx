import { useState } from "react";
import "./App.css";
import { ExpenseList } from "./Components/ExpenseList";
import "./Components/index.css";
import ExpenseFilter from "./Components/ExpenseFilter";
import ExpenseForm, { ExpenseFormData } from "./Components/ExpenseForm"; // Assuming you have ExpenseFormData type exported
import Title from "./Components/Title/Title";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const addExpense = (expense: ExpenseFormData) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <>
      <Title />
      <div className="form-content">
        <div className="mb-5">
          <ExpenseForm onSubmit={addExpense} />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
      </div>
    </>
  );
}

export default App;
