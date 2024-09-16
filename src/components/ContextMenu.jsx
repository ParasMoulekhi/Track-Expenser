import React from "react";

export default function ContextMenu({
  menuPostion,
  setMenuPostion,
  setExpenses,
  rowId,
  setExpense,
  expenses,
  setEditingRowId,
}) {
  if (!menuPostion?.left) return;
  return (
    <div className="context-menu" style={menuPostion}>
      <div
        onClick={() => {
          const { title, category, amount } = expenses.find(
            (a) => a.id === rowId
          );
          setEditingRowId(rowId);
          setExpense({ title, category, amount });
          setMenuPostion({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevExpense) =>
            prevExpense.filter((expense) => expense.id !== rowId)
          );
          setMenuPostion({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
