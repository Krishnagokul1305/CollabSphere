const users = [
  {
    name: "Brooklyn Simmons",
    role: "Front-End Developer",
    department: "Software",
    email: "brooklyns@ahfagon.com",
    phone: "(239) 555-0108",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Esther Howard",
    role: "UI/UX Designer",
    department: "Creative",
    email: "estherh@ahfagon.com",
    phone: "(208) 555-0112",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Leslie Alexander",
    role: "Product Manager",
    department: "Product",
    email: "lesliea@ahfagon.com",
    phone: "(239) 555-0108",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Wade Warren",
    role: "QA Tester",
    department: "Product",
    email: "wadew@ahfagon.com",
    phone: "(505) 555-0125",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Jenny Wilson",
    role: "Product Designer",
    department: "Creative",
    email: "jennyw@ahfagon.com",
    phone: "(803) 555-0111",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Robert Fox",
    role: "Front-End Developer",
    department: "Software",
    email: "robertf@ahfagon.com",
    phone: "(225) 555-0118",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Jacob Jones",
    role: "App Developer",
    department: "Software",
    email: "jacobj@ahfagon.com",
    phone: "(270) 555-0117",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Kristin Watson",
    role: "Back-End Developer",
    department: "Software",
    email: "kristinw@ahfagon.com",
    phone: "(225) 555-0109",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Cody Fisher",
    role: "Software Engineer",
    department: "Software",
    email: "codyf@ahfagon.com",
    phone: "(480) 555-0103",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Savannah Nguyen",
    role: "Graphics Engineer",
    department: "Creative",
    email: "nguyens@ahfagon.com",
    phone: "(225) 555-0108",
    status: "Active",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661589836910-b3b0bf644bd5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwYmxhY2slMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const tasks = [
  {
    id: "task1",
    title: "Design homepage UI",
    status: "in progress",
    priority: "high",
    assignee: "john.doe@example.com",
    dueDate: "2024-09-10",
  },
  {
    id: "task2",
    title: "Fix login authentication bug",
    status: "pending",
    priority: "medium",
    assignee: "jane.smith@example.com",
    dueDate: "2024-09-15",
  },
  {
    id: "task3",
    title: "Implement payment gateway",
    status: "completed",
    priority: "high",
    assignee: "mike.jones@example.com",
    dueDate: "2024-08-30",
  },
  {
    id: "task4",
    title: "Optimize database queries",
    status: "in progress",
    priority: "low",
    assignee: "susan.white@example.com",
    dueDate: "2024-09-05",
  },
  {
    id: "task5",
    title: "Write API documentation",
    status: "pending",
    priority: "medium",
    assignee: "emma.brown@example.com",
    dueDate: "2024-09-20",
  },
  {
    id: "task3",
    title: "Implement payment gateway",
    status: "completed",
    priority: "high",
    assignee: "mike.jones@example.com",
    dueDate: "2024-08-30",
  },
];

export { users, tasks };
