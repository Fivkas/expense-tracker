"use client";

import { useEffect, useState } from "react";

// Types
type Category = { id: number; name: string };
type Expense = { id: number; title: string; amount: number; categoryId: number; createdAt: string };

const API = "http://localhost:4000";

export default function Home() {
  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Expenses state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Fetch categories & expenses on mount
  useEffect(() => {
    fetch(`${API}/categories`).then(r => r.json()).then(setCategories)
      .catch(err => console.error("Failed to fetch categories:", err));

    fetch(`${API}/expenses`).then(r => r.json()).then(setExpenses)
      .catch(err => console.error("Failed to fetch expenses:", err));
  }, []);

  // ---- Categories ----
  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create category");
      }
      const created: Category = await res.json();
      setCategories(prev => [...prev, created]);
      setNewCategoryName("");
    } catch (e: any) {
      alert(`Could not add category: ${e.message}`);
    }
  };

const deleteCategory = async (id: number) => {
  try {
    const res = await fetch(`${API}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      // trying to read structured Nest error
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(Array.isArray(json.message) ? json.message.join(", ") : json.message || text);
      } catch {
        throw new Error(text || "Failed to delete category");
      }
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    setExpenses(prev => prev.filter(e => e.categoryId !== id)); // optional UI cleanup
  } catch (e: any) {
    alert(e.message);
  }
};

  // ---- Expenses ----
  const addExpense = async () => {
    if (!title.trim() || !amount || !categoryId) return;
    try {
      const res = await fetch(`${API}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          amount: parseFloat(amount),
          categoryId: parseInt(categoryId, 10),
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create expense");
      }
      const created: Expense = await res.json();
      setExpenses(prev => [...prev, created]);
      setTitle("");
      setAmount("");
      setCategoryId("");
    } catch (e: any) {
      alert(`Could not add expense: ${e.message}`);
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      const res = await fetch(`${API}/expenses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to delete expense");
      }
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (e: any) {
      alert(`Could not delete expense: ${e.message}`);
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">💰 Expense Tracker</h1>

      {/* -------------------- Categories Section -------------------- */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📂 Categories</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category"
            className="p-2 rounded bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center justify-between border border-gray-700 rounded p-2">
              <span>{c.name}</span>
              <button
                onClick={() => deleteCategory(c.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                title="Delete category"
              >
                Delete
              </button>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="text-gray-400">No categories yet.</li>
          )}
        </ul>
      </section>

      {/* -------------------- Expenses Section -------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🧾 Expenses</h2>

        {/* Expense form */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 rounded bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="p-2 rounded bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={addExpense}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Add
          </button>
        </div>

        {/* Expenses table */}
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-t border-gray-700 hover:bg-gray-800">
                <td className="p-3">{exp.title}</td>
                <td className="p-3">{exp.amount.toFixed(2)} €</td>
                <td className="p-3">
                  {categories.find((c) => c.id === exp.categoryId)?.name || "—"}
                </td>
                <td className="p-3">{new Date(exp.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    title="Delete expense"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-gray-400">
                  No expenses yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 className="mt-4 text-xl font-bold">Total: {total.toFixed(2)} €</h3>
      </section>
    </main>
  );
}

