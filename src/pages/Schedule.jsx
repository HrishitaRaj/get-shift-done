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
  {
    name: "Alex Rodriguez",
    schedule: {
      Monday: { task: "Data Cleanup", time: "11:00 AM" },
      Tuesday: { task: "Database Optimization", time: "1:00 PM" },
      Wednesday: { task: "Report Automation", time: "10:00 AM" },
      Thursday: { task: "Team Meeting", time: "3:00 PM" },
      Friday: { task: "Client Dashboard Update", time: "2:00 PM" },
    },
  },
  {
    name: "Emma Thompson",
    schedule: {
      Monday: { task: "User Interviews", time: "9:30 AM" },
      Tuesday: { task: "Wireframe Draft", time: "11:00 AM" },
      Wednesday: { task: "UX Review", time: "2:30 PM" },
      Thursday: { task: "Team Meeting", time: "3:00 PM" },
      Friday: { task: "Final Mockups", time: "1:30 PM" },
    },
  },
  {
    name: "Liam Patel",
    schedule: {
      Monday: { task: "Server Deployment", time: "10:00 AM" },
      Tuesday: { task: "CI/CD Setup", time: "11:30 AM" },
      Wednesday: { task: "Monitoring Alerts", time: "3:00 PM" },
      Thursday: { task: "Incident Review", time: "2:00 PM" },
      Friday: { task: "Log Analysis", time: "1:00 PM" },
    },
  },
  {
    name: "Olivia Park",
    schedule: {
      Monday: { task: "Market Research", time: "9:00 AM" },
      Tuesday: { task: "Campaign Planning", time: "2:00 PM" },
      Wednesday: { task: "Audience Segmentation", time: "12:00 PM" },
      Thursday: { task: "Social Media Audit", time: "1:30 PM" },
      Friday: { task: "Email Strategy", time: "3:00 PM" },
    },
  },
  {
    name: "Ethan Wright",
    schedule: {
      Monday: { task: "Testing New Features", time: "10:30 AM" },
      Tuesday: { task: "Bug Reproduction", time: "1:00 PM" },
      Wednesday: { task: "QA Sync", time: "3:30 PM" },
      Thursday: { task: "Regression Tests", time: "10:00 AM" },
      Friday: { task: "Test Report Review", time: "2:00 PM" },
    },
  },
  {
    name: "Ava Kim",
    schedule: {
      Monday: { task: "Sprint Planning", time: "11:00 AM" },
      Tuesday: { task: "Stakeholder Meeting", time: "4:00 PM" },
      Wednesday: { task: "Roadmap Review", time: "2:00 PM" },
      Thursday: { task: "Feature Prioritization", time: "12:30 PM" },
      Friday: { task: "Demo Day Prep", time: "10:00 AM" },
    },
  },
  {
    name: "Noah Singh",
    schedule: {
      Monday: { task: "Security Audit", time: "9:30 AM" },
      Tuesday: { task: "Firewall Check", time: "11:00 AM" },
      Wednesday: { task: "Pen Testing", time: "1:00 PM" },
      Thursday: { task: "Policy Update", time: "3:30 PM" },
      Friday: { task: "Compliance Report", time: "2:00 PM" },
    },
  },
  {
    name: "Isabella Garcia",
    schedule: {
      Monday: { task: "Content Strategy", time: "10:00 AM" },
      Tuesday: { task: "SEO Optimization", time: "11:30 AM" },
      Wednesday: { task: "Blog Writing", time: "1:30 PM" },
      Thursday: { task: "Web Copy Review", time: "2:30 PM" },
      Friday: { task: "Newsletter Draft", time: "3:30 PM" },
    },
  },
  {
    name: "James Lee",
    schedule: {
      Monday: { task: "Code Review", time: "11:00 AM" },
      Tuesday: { task: "Tech Handoff", time: "1:30 PM" },
      Wednesday: { task: "Architecture Planning", time: "2:00 PM" },
      Thursday: { task: "Knowledge Sharing", time: "4:00 PM" },
      Friday: { task: "Refactoring Sprint", time: "12:00 PM" },
    },
  },
  {
    name: "Mia Brown",
    schedule: {
      Monday: { task: "Onboarding Prep", time: "9:00 AM" },
      Tuesday: { task: "Team Welcome", time: "10:00 AM" },
      Wednesday: { task: "Mentorship Session", time: "3:00 PM" },
      Thursday: { task: "Training Doc Review", time: "1:30 PM" },
      Friday: { task: "Feedback Collection", time: "2:00 PM" },
    },
  },
  {
    name: "Benjamin Nguyen",
    schedule: {
      Monday: { task: "Prototype Testing", time: "10:30 AM" },
      Tuesday: { task: "Usability Study", time: "2:00 PM" },
      Wednesday: { task: "UI Polish", time: "12:00 PM" },
      Thursday: { task: "Microcopy Fixes", time: "3:00 PM" },
      Friday: { task: "Animation Review", time: "1:00 PM" },
    },
  },
  {
    name: "Charlotte Davis",
    schedule: {
      Monday: { task: "PRD Drafting", time: "9:00 AM" },
      Tuesday: { task: "Customer Feedback Analysis", time: "11:00 AM" },
      Wednesday: { task: "Feature Specs", time: "2:00 PM" },
      Thursday: { task: "Engineering Sync", time: "3:30 PM" },
      Friday: { task: "OKR Alignment", time: "12:30 PM" },
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
  const [selectedDay, setSelectedDay] = useState("Monday");

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

  const renderDailyView = () => {
    // Calculate total and completed tasks for today
    const totalTasks = teamSchedule.reduce((count, member) => {
      return member.schedule[today] ? count + 1 : count;
    }, 0);

    const completedTasks = teamSchedule.reduce((count, member) => {
      const key = `${member.name}-${today}`;
      return completed[key] ? count + 1 : count;
    }, 0);

    const completionPercentage = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return (
      <div>
        {/* Summary Section */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-pink-400">Today's Summary</h3>
          <p className="text-gray-300">
            Total Tasks: <span className="font-bold text-blue-400">{totalTasks}</span>
          </p>
          <p className="text-gray-300">
            Completed Tasks: <span className="font-bold text-green-400">{completedTasks}</span>
          </p>
          <p className="text-gray-300">
            Completion Percentage:{" "}
            <span className="font-bold text-yellow-400">{completionPercentage}%</span>
          </p>
        </div>

        {/* Task List */}
        {totalTasks === 0 ? (
          <p className="text-gray-400 text-center">No tasks scheduled for today.</p>
        ) : (
          <ul className="space-y-3">
            {teamSchedule.map((member) => {
              const taskObj = member.schedule[today];
              if (!taskObj) return null;
              const key = `${member.name}-${today}`;
              return (
                <li
                  key={key}
                  className="flex items-center justify-between border-b border-gray-700 pb-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400 font-medium">{member.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm flex items-center gap-1 ${getTaskColor(taskObj.task)} ${
                        completed[key] ? "line-through opacity-60" : ""
                      }`}
                    >
                      {getTaskIcon(taskObj.task)} {taskObj.task} - {taskObj.time}
                    </span>
                    <button onClick={() => toggleCompleted(member.name, today)}>
                      <input
                        type="checkbox"
                        checked={!!completed[key]}
                        className="accent-pink-500 w-4 h-4"
                      />
                    </button>
                    <button onClick={() => handleEditTask(member.name, today)}>
                      <Pencil className="w-4 h-4 text-gray-400 hover:text-green-400" />
                    </button>
                    <button onClick={() => handleDeleteTask(member.name, today)}>
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const renderDayView = () => {
    // Calculate total and completed tasks for the selected day
    const totalTasks = teamSchedule.reduce((count, member) => {
      return member.schedule[selectedDay] ? count + 1 : count;
    }, 0);

    const completedTasks = teamSchedule.reduce((count, member) => {
      const key = `${member.name}-${selectedDay}`;
      return completed[key] ? count + 1 : count;
    }, 0);

    return (
      <div>
        {/* Summary Section */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-pink-400">Day Summary</h3>
          <p className="text-gray-300">
            Total Tasks: <span className="font-bold text-blue-400">{totalTasks}</span>
          </p>
          <p className="text-gray-300">
            Completed Tasks: <span className="font-bold text-green-400">{completedTasks}</span>
          </p>
        </div>

        {/* Task List */}
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="day-select" className="text-gray-400">
            Select Day:
          </label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <ul className="space-y-3">
          {teamSchedule.map((member) => {
            const taskObj = member.schedule[selectedDay];
            if (!taskObj) return null;
            const key = `${member.name}-${selectedDay}`;
            return (
              <li
                key={key}
                className="flex items-center justify-between border-b border-gray-700 pb-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-pink-400 font-medium">{member.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm flex items-center gap-1 ${getTaskColor(taskObj.task)} ${
                      completed[key] ? "line-through opacity-60" : ""
                    }`}
                  >
                    {getTaskIcon(taskObj.task)} {taskObj.task} - {taskObj.time}
                  </span>
                  <button onClick={() => toggleCompleted(member.name, selectedDay)}>
                    <input
                      type="checkbox"
                      checked={!!completed[key]}
                      className="accent-pink-500 w-4 h-4"
                    />
                  </button>
                  <button onClick={() => handleEditTask(member.name, selectedDay)}>
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-green-400" />
                  </button>
                  <button onClick={() => handleDeleteTask(member.name, selectedDay)}>
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-400" />
          {viewMode === "weekly"
            ? "Weekly Schedule"
            : viewMode === "daily"
            ? `${today}'s Schedule`
            : `${selectedDay}'s Tasks`}
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
            onClick={() =>
              setViewMode(viewMode === "weekly" ? "daily" : viewMode === "daily" ? "day" : "weekly")
            }
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-sm text-white px-4 py-2 rounded-lg transition-colors border border-gray-600"
          >
            <CalendarCheck2 className="w-4 h-4 mr-2" />
            Switch to {viewMode === "weekly" ? "Daily" : viewMode === "daily" ? "Day" : "Weekly"} View
          </button>
        </div>
      </div>

      {/* Grid */}
      {viewMode === "weekly" ? (
        <div className="grid md:grid-cols-2 gap-6">
          {teamSchedule.filter(filterSchedule).map((member) => (
            <motion.div
              key={member.name}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              {/* Header with progress bar */}
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
                {Object.entries(member.schedule).map(([day, { task, time }]) => {
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
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      ) : viewMode === "daily" ? (
        renderDailyView()
      ) : (
        renderDayView()
      )}
    </div>
  );
};

export default Schedule;
