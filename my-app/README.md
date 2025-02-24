# Customizable Table Columns in React

## 🔥 How This is More Customizable

### ✅ Dynamic Column Configuration

- Supports **default cell rendering** (text values) **OR** custom rendering via `customRender`.
- Sorting and filtering can be **enabled/disabled per column**.
- Can **dynamically disable checkboxes** using `needCheckbox`.

### ✅ Custom Rendering for Specific Columns

With `createColumn`, you can **define custom rendering** for **any column**:

```javascript
const columns = createColumn(
  [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "priority",
      header: "Priority",
      customRender: (value) => (
        <span
          className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${
            value === "high"
              ? "bg-red-200 text-red-800"
              : value === "medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ],
  actionItems, // Pass actions
  { needCheckbox: false } // Disable checkboxes if not needed
);
```

---

## 🎯 Todo

✔ Try to complete todo section
✔ move the table to a client component then only you will pass functions else server function error will occur

## 🎯 Work Completed

✔ created layout and components for todo
✔ changed column configuration for table completely customizable
