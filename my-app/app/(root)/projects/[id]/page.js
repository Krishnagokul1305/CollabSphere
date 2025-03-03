import TaskCard from "@/app/_components/Task/TaskCard";

export default async function Page() {
  const dummyTasks = [
    {
      id: 1,
      category: "Web Design",
      title: "Twottir - Redesign Project",
      description: "Here you will make a Twitter web redesign project.",
      progress: 65,
      members: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/45.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg",
      ],
      dueDate: "02 May 23",
      priority: "High",
    },
    {
      id: 2,
      category: "Development",
      title: "E-commerce API",
      description: "Build a backend for an online store.",
      progress: 40,
      members: [
        "https://randomuser.me/api/portraits/men/50.jpg",
        "https://randomuser.me/api/portraits/women/33.jpg",
      ],
      dueDate: "10 Sep 23",
      priority: "Medium",
    },
    {
      id: 3,
      category: "UI/UX",
      title: "Dashboard Redesign",
      description: "Improve the user interface of the admin panel.",
      progress: 20,
      members: [
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/men/28.jpg",
      ],
      dueDate: "15 Aug 23",
      priority: "High",
    },
    {
      id: 4,
      category: "Testing",
      title: "Bug Fixing Sprint",
      description: "Identify and resolve UI and API bugs.",
      progress: 50,
      members: [
        "https://randomuser.me/api/portraits/men/18.jpg",
        "https://randomuser.me/api/portraits/women/30.jpg",
        "https://randomuser.me/api/portraits/men/40.jpg",
      ],
      dueDate: "22 Jul 23",
      priority: "Low",
    },
    {
      id: 5,
      category: "Mobile Development",
      title: "iOS App Development",
      description: "Create an iOS version of our mobile app.",
      progress: 75,
      members: [
        "https://randomuser.me/api/portraits/women/15.jpg",
        "https://randomuser.me/api/portraits/men/35.jpg",
      ],
      dueDate: "05 Oct 23",
      priority: "High",
    },
    {
      id: 6,
      category: "DevOps",
      title: "CI/CD Pipeline Setup",
      description: "Automate deployment processes.",
      progress: 30,
      members: ["https://randomuser.me/api/portraits/men/21.jpg"],
      dueDate: "30 Nov 23",
      priority: "Medium",
    },
    {
      id: 7,
      category: "Marketing",
      title: "SEO Optimization",
      description: "Improve website SEO ranking.",
      progress: 90,
      members: [
        "https://randomuser.me/api/portraits/women/11.jpg",
        "https://randomuser.me/api/portraits/men/19.jpg",
      ],
      dueDate: "18 Dec 23",
      priority: "Low",
    },
  ];

  return (
    <div className="h-full flex-1 flex-col space-y-2  md:flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
