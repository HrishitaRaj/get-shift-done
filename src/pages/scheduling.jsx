import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, Users, Award, Calendar, Activity, Filter, RefreshCcw, Bell, Zap, TrendingUp, BarChart2, Clipboard, Layers, Upload  } from 'lucide-react';

// Sample data
const initialEmployees = [
  { id: 1, name: "Sarah Johnson", skills: ["JavaScript", "React", "UI Design"], availability: [9, 10, 11, 13, 14, 15, 16], energyLevel: 85, performance: 92, completedTasks: 24 },
  { id: 2, name: "Michael Chen", skills: ["Python", "Data Analysis", "Backend"], availability: [8, 9, 10, 11, 12, 13, 14], energyLevel: 92, performance: 88, completedTasks: 31 },
  { id: 3, name: "Alex Rodriguez", skills: ["UI Design", "CSS", "Animation"], availability: [10, 11, 12, 13, 14, 15, 16, 17], energyLevel: 78, performance: 85, completedTasks: 18 },
  { id: 4, name: "Emma Thompson", skills: ["React", "TypeScript", "Backend"], availability: [9, 10, 14, 15, 16, 17], energyLevel: 90, performance: 94, completedTasks: 27 }
];

const initialTasks = [
  { id: 101, name: "Design New Dashboard", skills: ["UI Design", "CSS"], duration: 3, priority: "High", deadline: "2025-04-10", status: "Pending" },
  { id: 102, name: "API Integration", skills: ["JavaScript", "Backend"], duration: 4, priority: "Medium", deadline: "2025-04-15", status: "Pending" },
  { id: 103, name: "Fix Login Bug", skills: ["React", "TypeScript"], duration: 2, priority: "Critical", deadline: "2025-04-08", status: "Pending" },
  { id: 104, name: "Data Visualization", skills: ["Python", "Data Analysis"], duration: 5, priority: "Medium", deadline: "2025-04-20", status: "Pending" }
];

const priorityOrder = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 };
const allSkills = ["JavaScript", "React", "UI Design", "CSS", "TypeScript", "Python", "Data Analysis", "Backend", "Animation"];

const CosmicTaskAllocation = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [tasks, setTasks] = useState(initialTasks);
  const [allocations, setAllocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    skills: [],
    duration: 2,
    priority: "Medium",
    deadline: new Date(Date.now() + 7 * 24 * 3600000).toISOString().split('T')[0],
    status: "Pending"
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  const notificationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.2 }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-400";
      case "High": return "text-orange-400";
      case "Medium": return "text-blue-400";
      default: return "text-green-400";
    }
  };

  const calculateCosmicMatch = (employee, task) => {
    const skillMatch = task.skills.filter(skill => employee.skills.includes(skill)).length / task.skills.length;
    const energyFactor = employee.energyLevel / 100;
    const performanceFactor = employee.performance / 100;
    return Math.round((skillMatch * 0.5 + energyFactor * 0.2 + performanceFactor * 0.3) * 100);
  };

  const allocateTasks = () => {
    const newAllocations = [];
    const tasksCopy = [...tasks];
    const employeesCopy = [...employees];

    // Sort tasks by priority
    tasksCopy.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    tasksCopy.forEach(task => {
      let bestMatch = null;
      let highestScore = -1;
      let bestMatchIndex = -1;

      employeesCopy.forEach((employee, index) => {
        const score = calculateCosmicMatch(employee, task);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = employee;
          bestMatchIndex = index;
        }
      });

      if (bestMatch) {
        newAllocations.push({
          taskId: task.id,
          employeeId: bestMatch.id,
          matchScore: highestScore,
          estimatedCompletion: new Date(Date.now() + task.duration * 3600000).toLocaleString()
        });
        
        // Update task status
        const taskIndex = tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: "Assigned" };
          setTasks(updatedTasks);
        }
      }
    });

    setAllocations(newAllocations);
    showNotificationMessage("Tasks have been allocated successfully!");
  };

  const viewEmployeeMatch = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setCurrentTask(task);
    setShowModal(true);
  };
  
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  const addNewTask = () => {
    setShowAddTaskModal(true);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  const handleSkillToggle = (skill) => {
    if (newTask.skills.includes(skill)) {
      setNewTask({
        ...newTask,
        skills: newTask.skills.filter(s => s !== skill)
      });
    } else {
      setNewTask({
        ...newTask,
        skills: [...newTask.skills, skill]
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.name.trim()) {
      showNotificationMessage("Task name is required!");
      return;
    }

    if (newTask.skills.length === 0) {
      showNotificationMessage("Please select at least one skill!");
      return;
    }

    const newTaskWithId = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      duration: parseInt(newTask.duration) || 2
    };

    setTasks([...tasks, newTaskWithId]);
    setShowAddTaskModal(false);
    showNotificationMessage("New task added successfully!");
    
    // Reset form
    setNewTask({
      name: "",
      skills: [],
      duration: 2,
      priority: "Medium",
      deadline: new Date(Date.now() + 7 * 24 * 3600000).toISOString().split('T')[0],
      status: "Pending"
    });
  };
  
  const markTaskComplete = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: "Completed" };
      setTasks(updatedTasks);
      
      // Update employee stats
      const allocation = allocations.find(a => a.taskId === taskId);
      if (allocation) {
        const employeeIndex = employees.findIndex(e => e.id === allocation.employeeId);
        if (employeeIndex !== -1) {
          const updatedEmployees = [...employees];
          updatedEmployees[employeeIndex] = { 
            ...updatedEmployees[employeeIndex], 
            completedTasks: updatedEmployees[employeeIndex].completedTasks + 1,
            energyLevel: Math.max(50, updatedEmployees[employeeIndex].energyLevel - 5) // Energy decreases after task
          };
          setEmployees(updatedEmployees);
        }
      }
      
      showNotificationMessage("Task marked as completed!");
    }
  };

  const filteredTasks = filterPriority === "All" ? tasks : tasks.filter(task => task.priority === filterPriority);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center gap-2">
              <Bell size={16} />
              <span>{notificationMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Task Allocation System
          </motion.h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-800 text-white rounded-lg border border-gray-600 flex items-center gap-1"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart2 size={16} />
              <span>Analytics</span>
            </motion.button>
            <motion.select
              className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-600"
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </motion.select>
            <motion.button
              onClick={allocateTasks}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star size={16} /> Schedule Tasks
            </motion.button>
            <motion.button
              onClick={addNewTask}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Clipboard size={16} /> Add Task
            </motion.button>
          </div>
        </motion.div>
        
        {/* Navigation Tabs */}
        <motion.div 
          className="flex mb-6 bg-gray-800 rounded-lg p-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${activeTab === 'tasks' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('tasks')}
            whileHover={{ backgroundColor: activeTab !== 'tasks' ? 'rgba(75, 85, 99, 0.3)' : '' }}
            whileTap={{ scale: 0.98 }}
          >
            <Layers size={16} />
            <span>Task Management</span>
          </motion.button>
          <motion.button
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${activeTab === 'performance' ? 'bg-gray-700' : ''}`}
            onClick={() => setActiveTab('performance')}
            whileHover={{ backgroundColor: activeTab !== 'performance' ? 'rgba(75, 85, 99, 0.3)' : '' }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp size={16} />
            <span>Team Performance</span>
          </motion.button>
        </motion.div>
        
        {activeTab === 'tasks' && (
          <>
            {showAnalytics && (
              <motion.div 
                className="mb-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-amber-400 mb-4 flex items-center gap-2">
                  <BarChart2 size={20} />
                  Task Analytics
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-gray-700 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-gray-400 text-sm mb-1">Task Status</h3>
                    <div className="flex items-end h-32 mt-2">
                      <motion.div 
                        className="w-1/3 bg-blue-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.status === 'Pending').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="text-xs text-center mt-2">Pending</div>
                      </motion.div>
                      <motion.div 
                        className="w-1/3 bg-amber-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.status === 'Assigned').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="text-xs text-center mt-2">Assigned</div>
                      </motion.div>
                      <motion.div 
                        className="w-1/3 bg-green-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.status === 'Completed').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="text-xs text-center mt-2">Completed</div>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-700 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-gray-400 text-sm mb-1">Priority Distribution</h3>
                    <div className="flex items-end h-32 mt-2">
                      <motion.div 
                        className="w-1/4 bg-red-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.priority === 'Critical').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="text-xs text-center mt-2">Critical</div>
                      </motion.div>
                      <motion.div 
                        className="w-1/4 bg-orange-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.priority === 'High').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="text-xs text-center mt-2">High</div>
                      </motion.div>
                      <motion.div 
                        className="w-1/4 bg-blue-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.priority === 'Medium').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="text-xs text-center mt-2">Medium</div>
                      </motion.div>
                      <motion.div 
                        className="w-1/4 bg-green-500 rounded-t-md mx-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${tasks.filter(t => t.priority === 'Low').length / tasks.length * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="text-xs text-center mt-2">Low</div>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-700 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-gray-400 text-sm mb-1">Team Energy Levels</h3>
                    <div className="space-y-2 mt-2">
                      {employees.map(employee => (
                        <div key={employee.id} className="text-xs">
                          <div className="flex justify-between mb-1">
                            <span>{employee.name}</span>
                            <span>{employee.energyLevel}%</span>
                          </div>
                          <motion.div className="w-full bg-gray-600 rounded-full h-2">
                            <motion.div 
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${employee.energyLevel}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Employee Constellation */}
              <motion.div 
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="text-purple-400" />
                  <h2 className="text-xl font-semibold text-purple-400">Team Members</h2>
                </div>
                <div className="space-y-4">
                  {employees.map(employee => (
                    <motion.div 
                      key={employee.id} 
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(75, 85, 99, 0.8)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{employee.name}</h3>
                        <div className="flex items-center gap-1">
                          <Activity size={14} className="text-green-400" />
                          <span className="text-green-400">{employee.energyLevel}%</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {employee.skills.map(skill => (
                          <motion.span 
                            key={skill} 
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                            whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.8)', scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Clock size={14} className="text-blue-400" />
                        <div className="flex gap-1">
                          {employee.availability.map(hour => (
                            <motion.span 
                              key={hour} 
                              className="w-5 h-5 flex items-center justify-center bg-gray-700 rounded-sm text-xs"
                              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.8)' }}
                            >
                              {hour}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Zap size={14} className="text-amber-400" />
                        <span className="text-xs">Completed: {employee.completedTasks} tasks</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tasks Nebula */}
              <motion.div 
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-400" />
                    <h2 className="text-xl font-semibold text-blue-400">Tasks</h2>
                  </div>
                  <motion.button
                    className="text-xs flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-lg"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(75, 85, 99, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter size={12} />
                    <span>Filter</span>
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <motion.div 
                      key={task.id} 
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(75, 85, 99, 0.8)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{task.name}</h3>
                        <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock size={14} className="text-amber-400" />
                        <span className="text-sm">{task.duration} hours</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-400">Due: {task.deadline}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {task.skills.map(skill => (
                          <motion.span 
                            key={skill} 
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                            whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.8)', scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-900 text-green-200' : 
                          task.status === 'Assigned' ? 'bg-blue-900 text-blue-200' : 
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {task.status}
                        </span>
                        {task.status === 'Assigned' && (
                          <motion.button
                            className="text-xs px-2 py-1 bg-green-900 text-green-200 rounded-lg"
                            onClick={() => markTaskComplete(task.id)}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 95, 70, 0.9)' }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Mark Complete
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Cosmic Alignment Results */}
              <motion.div 
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-pink-400" />
                  <h2 className="text-xl font-semibold text-pink-400">Allotment</h2>
                </div>
                {allocations.length > 0 ? (
                  <div className="space-y-4">
                    {allocations.map(allocation => {
                      const task = tasks.find(t => t.id === allocation.taskId);
                      const employee = employees.find(e => e.id === allocation.employeeId);
                      return (
                        <motion.div 
                          key={allocation.taskId} 
                          className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(75, 85, 99, 0.8)' }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{task.name}</h3>
                            <motion.button
                              onClick={() => viewEmployeeMatch(task.id)}
                              className="text-xs px-2 py-1 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Match
                            </motion.button>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{employee.name}</span>
                              <span className="text-sm font-medium text-pink-400">{allocation.matchScore}% Match</span>
                            </div>
                            <motion.div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${allocation.matchScore}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </motion.div>
                          </div>
                          <div className="mt-3 text-xs text-gray-400">
                            <span>Estimated completion: {allocation.estimatedCompletion}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-64 text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        transition: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      <Star size={48} className="mb-4 opacity-50" />
                    </motion.div>
                    <p className="text-center">Ready to automate your tasks</p>
                    <p className="text-center text-sm mt-2">Click "Schedule Tasks" to start the task allotment process</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
        
        {activeTab === 'performance' && (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Performance Metrics
              </h2>
              <div className="space-y-4">
                {employees.map(employee => (
                  <motion.div 
                    key={employee.id} 
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-medium text-lg mb-2">{employee.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Performance</span>
                          <span>{employee.performance}%</span>
                        </div>
                        <motion.div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${employee.performance}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </motion.div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Energy Level</span>
                          <span>{employee.energyLevel}%</span>
                        </div>
                        <motion.div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${employee.energyLevel}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </motion.div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tasks Completed</span>
                          <span>{employee.completedTasks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.min(10, employee.completedTasks))].map((_, i) => (
                            <motion.div 
                              key={i}
                              className="w-2 h-2 bg-amber-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                <RefreshCcw size={20} />
                Productivity Insights
              </h2>
              <div className="space-y-4">
                <motion.div 
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg mb-3">Task Completion Rate</h3>
                  <div className="flex items-center justify-center">
                    <motion.div 
                      className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center relative"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 1, type: "spring" }}
                    >
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        initial={{ background: "conic-gradient(#10b981 0%, transparent 0%)" }}
                        animate={{ 
                          background: `conic-gradient(#10b981 ${tasks.filter(t => t.status === 'Completed').length / tasks.length * 100}%, transparent 0%)` 
                        }}
                        transition={{ duration: 1.5 }}
                      />
                      <div className="bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center z-10">
                        <div className="text-xl font-bold">
                          {Math.round(tasks.filter(t => t.status === 'Completed').length / tasks.length * 100)}%
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg mb-3">Team Efficiency</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Match Score</span>
                      <span>
                        {allocations.length > 0 
                          ? Math.round(allocations.reduce((sum, a) => sum + a.matchScore, 0) / allocations.length)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Team Skill Coverage</span>
                      <span>
                        {Math.round(
                          [...new Set(employees.flatMap(e => e.skills))].length / 
                          [...new Set(tasks.flatMap(t => t.skills))].length * 100
                        )}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Task Completion Rate</span>
                      <span>
                        {Math.round(tasks.filter(t => t.status === 'Completed').length / tasks.length * 100)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg mb-3">Team Workload</h3>
                  <div className="space-y-2">
                    {employees.map(employee => {
                      const assignedTasks = allocations.filter(a => a.employeeId === employee.id).length;
                      const workloadPercentage = Math.min(100, assignedTasks * 25); // Each task represents 25% workload
                      
                      return (
                        <div key={employee.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{employee.name}</span>
                            <span>{assignedTasks} tasks</span>
                          </div>
                          <motion.div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full ${
                                workloadPercentage > 75 ? 'bg-red-500' : 
                                workloadPercentage > 50 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${workloadPercentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Modal */}
        {showModal && currentTask && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <h3 className="text-xl font-semibold mb-4">{currentTask.name} - Best Matches</h3>
              <div className="space-y-4 mb-6">
                {employees.map(employee => {
                  const matchScore = calculateCosmicMatch(employee, currentTask);
                  return (
                    <motion.div 
                      key={employee.id} 
                      className="flex items-center justify-between"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <div className="flex gap-1 mt-1">
                          {currentTask.skills.map(skill => (
                            <motion.span 
                              key={skill} 
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                employee.skills.includes(skill) ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-400'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.p 
                          className={matchScore > 80 ? "text-green-400" : matchScore > 60 ? "text-amber-400" : "text-red-400"}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                        >
                          {matchScore}%
                        </motion.p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.button
                onClick={() => setShowModal(false)}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
        
      </div>
      {/* Add Task Modal */}
{showAddTaskModal && (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-lg w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clipboard size={20} className="text-green-400" />
        <span>Add New Task</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Task Name</label>
          <input 
            type="text" 
            name="name"
            value={newTask.name}
            onChange={handleNewTaskChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            placeholder="Enter task name"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Required Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allSkills.map(skill => (
              <motion.button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  newTask.skills.includes(skill) 
                    ? 'bg-blue-600 text-white border-blue-500' 
                    : 'bg-gray-700 text-gray-300 border-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Duration (hours)</label>
            <input 
              type="number" 
              name="duration"
              min="1"
              max="24"
              value={newTask.duration}
              onChange={handleNewTaskChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Priority</label>
            <select 
              name="priority"
              value={newTask.priority}
              onChange={handleNewTaskChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Deadline</label>
          <input 
            type="date" 
            name="deadline"
            value={newTask.deadline}
            onChange={handleNewTaskChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
          />
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <motion.button
          onClick={() => setShowAddTaskModal(false)}
          className="flex-1 py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        
        <motion.button
          onClick={handleAddTask}
          className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={16} />
          <span>Add Task</span>
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
)}
    </div>
  );
};

export default CosmicTaskAllocation;