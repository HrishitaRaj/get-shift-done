import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  CalendarCheck2,
  Pencil,
  Trash2,
  Search,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

// Initial schedule data
const initialTeamSchedule = [
  {
    name: "Sarah Johnson",
    schedule: {
      Monday: { task: "UI Design", time: "10:00 AM" },
      Tuesday: { task: "React Review", time: "2:00 PM" },
      Wednesday: { task: "Dashboard Design", time: "11:00 AM" },
      Thursday: { task: "Team Meeting", time: "3:00 PM" },
      Friday: { task: "Code Cleanup", time: "1:00 PM" },
    },
  },
  {
    name: "Michael Chen",
    schedule: {
      Monday: { task: "Backend API", time: "9:00 AM" },
      Tuesday: { task: "Data Analysis", time: "3:00 PM" },
      Wednesday: { task: "Bug Fixing", time: "12:00 PM" },
      Thursday: { task: "Team Meeting", time: "3:00 PM" },
      Friday: { task: "Task Allocation Review", time: "4:00 PM" },
    },
  },
];

const getTaskColor = (task) => {
  const lower = task.toLowerCase();
  if (lower.includes("design")) return "text-purple-300";
  if (lower.includes("review")) return "text-green-300";
  if (lower.includes("meeting")) return "text-yellow-300 font-semibold";
  if (lower.includes("cleanup")) return "text-red-300";
  if (lower.includes("analysis") || lower.includes("report")) return "text-blue-300";
  return "text-gray-300";
};

const getTaskIcon = (task) => {
  const lower = task.toLowerCase();
  if (lower.includes("design")) return "🎨";
  if (lower.includes("review")) return "🔍";
  if (lower.includes("meeting")) return "📅";
  if (lower.includes("cleanup")) return "🧹";
  if (lower.includes("api") || lower.includes("backend")) return "🛠️";
  if (lower.includes("analysis") || lower.includes("report")) return "📊";
  return "🗂️";
};

const Schedule = () => {
  const [teamSchedule, setTeamSchedule] = useState(initialTeamSchedule);
  const [completed, setCompleted] = useState({});
  const [viewMode, setViewMode] = useState("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("completedTasks");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completed));
  }, [completed]);

  const getToday = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const today = getToday();

  const toggleCompleted = (name, day) => {
    const key = `${name}-${day}`;
    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeleteTask = (name, day) => {
    setTeamSchedule((prev) =>
      prev.map((member) =>
        member.name === name
          ? {
              ...member,
              schedule: Object.fromEntries(
                Object.entries(member.schedule).filter(([d]) => d !== day)
              ),
            }
          : member
      )
    );
  };

  const handleEditTask = (name, day) => {
    const member = teamSchedule.find((m) => m.name === name);
    const current = member?.schedule[day];
    const newTask = prompt("Edit task name:", current.task);
    const newTime = prompt("Edit task time:", current.time);
    if (newTask && newTime) {
      setTeamSchedule((prev) =>
        prev.map((member) =>
          member.name === name
            ? {
                ...member,
                schedule: {
                  ...member.schedule,
                  [day]: { task: newTask, time: newTime },
                },
              }
            : member
        )
      );
    }
  };

  const filterSchedule = (member) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    if (member.name.toLowerCase().includes(query)) return true;
    return Object.values(member.schedule).some(({ task }) =>
      task.toLowerCase().includes(query)
    );
  };

  const getCompletionPercentage = (member) => {
    const days = Object.keys(member.schedule);
    const total = days.length;
    const completedCount = days.filter(
      (day) => completed[`${member.name}-${day}`]
    ).length;
    return Math.round((completedCount / total) * 100);
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-400" />
          {viewMode === "weekly" ? "Weekly Schedule" : `${today}'s Schedule`}
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700"
          />
          <button
            onClick={() => setViewMode(viewMode === "weekly" ? "daily" : "weekly")}
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition-colors border border-gray-600"
          >
            <CalendarCheck2 className="w-4 h-4 mr-2" />
            Switch to {viewMode === "weekly" ? "Daily" : "Weekly"} View
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {teamSchedule.filter(filterSchedule).map((member) => (
          <motion.div
            key={member.name}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 shadow-md"
            whileHover={{ scale: 1.03 }}
          >
            {/* Header with progress bar yes*/}
            <div className="mb-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-pink-400">{member.name}</h3>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">
                    {getCompletionPercentage(member)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getCompletionPercentage(member)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </div>

            {/* Task list */}
            <ul className="space-y-3">
              {viewMode === "weekly"
                ? Object.entries(member.schedule).map(([day, { task, time }]) => {
                    const key = `${member.name}-${day}`;
                    return (
                      <li key={day} className="flex items-center justify-between border-b border-gray-700 pb-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!completed[key]}
                            onChange={() => toggleCompleted(member.name, day)}
                            className="accent-pink-500 w-4 h-4"
                          />
                          <span className="text-blue-300 font-medium">{day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm flex items-center gap-1 ${getTaskColor(task)} ${
                              completed[key] ? "line-through opacity-60" : ""
                            }`}
                          >
                            {getTaskIcon(task)} {task} - {time}
                          </span>
                          <button onClick={() => handleEditTask(member.name, day)}>
                            <Pencil className="w-4 h-4 text-gray-400 hover:text-green-400" />
                          </button>
                          <button onClick={() => handleDeleteTask(member.name, day)}>
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </li>
                    );
                  })
                : (() => {
                    const taskObj = member.schedule[today];
                    if (!taskObj) return <li className="text-gray-400 italic">No task today.</li>;
                    const key = `${member.name}-${today}`;
                    return (
                      <li className="flex items-center justify-between border-b border-gray-700 pb-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!completed[key]}
                            onChange={() => toggleCompleted(member.name, today)}
                            className="accent-pink-500 w-4 h-4"
                          />
                          <span className="text-blue-300 font-medium">{today}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm flex items-center gap-1 ${getTaskColor(taskObj.task)} ${
                              completed[key] ? "line-through opacity-60" : ""
                            }`}
                          >
                            {getTaskIcon(taskObj.task)} {taskObj.task} - {taskObj.time}
                          </span>
                          <button onClick={() => handleEditTask(member.name, today)}>
                            <Pencil className="w-4 h-4 text-gray-400 hover:text-green-400" />
                          </button>
                          <button onClick={() => handleDeleteTask(member.name, today)}>
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>
                      </li>
                    );
                  })()}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
