import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import SelectOptionInput from "./SelectOptionInput";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  // One way data binding -> Whenever our data/state is update then it will update my DOM/UI

  /* const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { title, category, amount, id: crypto.randomUUID() };
    setExpenses((prevState) => [...prevState, expense]);
    setTitle("");
    setCategory("");
    setAmount("");
  }; */

  /* const handleSubmit = (e) => {
    e.preventDefault();
    getFormData(e.target);
    const expense = { ...getFormData(e.target), id: crypto.randomUUID() };
    setExpenses((prevState) => [...prevState, expense]);
    e.target.reset();
  };

  const getFormData = (form) => {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }; */

  // all useState in one

  const [errors, setErrors] = useState({});
  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      {
        amountRegex: /^-?\d+$/,
        message: "Please enter valid amount in numbers",
      },
    ],
  };

  const validate = (formData) => {
    const errorData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 3) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.amountRegex && !rule.amountRegex.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.emailRegex && !rule.emailRegex.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorData);
    return errorData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;
    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        amount: "",
        category: "",
      });
      return;
    }
    const expenseData = {
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      id: crypto.randomUUID(),
    };
    setExpenses((prevState) => [...prevState, expenseData]);
    setExpense({
      title: "",
      amount: "",
      category: "",
    });
  };

  const categoryOption = [
    {
      title: "Select Category",
      value: "",
    },
    {
      title: "Grocery",
      value: "Grocery",
    },
    {
      title: "Clothes",
      value: "Clothes",
    },
    {
      title: "Bills",
      value: "Bills",
    },
    {
      title: "Education",
      value: "Education",
    },
    {
      title: "Medicine",
      value: "Medicine",
    },
  ];

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <Input
          label="Title"
          id="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
          name="title"
        />
        <SelectOptionInput
          label="Category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          error={errors.category}
          categoryOption={categoryOption}
        />
        <Input
          label="Amount"
          id="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
          name="amount"
        />
        <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
      </form>
    </>
  );
}
