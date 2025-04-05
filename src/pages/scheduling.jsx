import React, { useState, useEffect } from 'react';
import { Clock, Star, Users, Award, Calendar, Activity } from 'lucide-react';

// Sample data
const initialEmployees = [
  { id: 1, name: "Nova Stellar", skills: ["JavaScript", "React", "UI Design"], availability: [9, 10, 11, 13, 14, 15, 16], energyLevel: 85 },
  { id: 2, name: "Orion Coder", skills: ["Python", "Data Analysis", "Backend"], availability: [8, 9, 10, 11, 12, 13, 14], energyLevel: 92 },
  { id: 3, name: "Celeste Dev", skills: ["UI Design", "CSS", "Animation"], availability: [10, 11, 12, 13, 14, 15, 16, 17], energyLevel: 78 },
  { id: 4, name: "Astro Builder", skills: ["React", "TypeScript", "Backend"], availability: [9, 10, 14, 15, 16, 17], energyLevel: 90 }
];

const initialTasks = [
  { id: 101, name: "Design New Dashboard", skills: ["UI Design", "CSS"], duration: 3, priority: "High" },
  { id: 102, name: "API Integration", skills: ["JavaScript", "Backend"], duration: 4, priority: "Medium" },
  { id: 103, name: "Fix Login Bug", skills: ["React", "TypeScript"], duration: 2, priority: "Critical" },
  { id: 104, name: "Data Visualization", skills: ["Python", "Data Analysis"], duration: 5, priority: "Medium" }
];

const CosmicTaskAllocation = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [tasks, setTasks] = useState(initialTasks);
  const [allocations, setAllocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-400";
      case "High": return "text-orange-400";
      case "Medium": return "text-blue-400";
      default: return "text-green-400";
    }
  };

  // Calculate cosmic matching score between employee and task
  const calculateCosmicMatch = (employee, task) => {
    const skillMatch = task.skills.filter(skill => employee.skills.includes(skill)).length / task.skills.length;
    const energyFactor = employee.energyLevel / 100;
    return Math.round((skillMatch * 0.7 + energyFactor * 0.3) * 100);
  };

  // Auto-allocate tasks based on cosmic alignment
  const allocateTasks = () => {
    const newAllocations = [];
    const tasksCopy = [...tasks];
    
    // Sort tasks by priority
    tasksCopy.sort((a, b) => {
      const priorityOrder = {"Critical": 3, "High": 2, "Medium": 1, "Low": 0};
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    tasksCopy.forEach(task => {
      // Find best cosmic match
      let bestMatch = null;
      let highestScore = -1;
      
      employees.forEach(employee => {
        const score = calculateCosmicMatch(employee, task);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = employee;
        }
      });
      
      if (bestMatch) {
        newAllocations.push({
          taskId: task.id,
          employeeId: bestMatch.id,
          matchScore: highestScore
        });
      }
    });
    
    setAllocations(newAllocations);
  };

  // View employee details for a task
  const viewEmployeeMatch = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setCurrentTask(task);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Cosmic Task Allocation System
          </h1>
          <button 
            onClick={allocateTasks}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2"
          >
            <Star size={16} /> Align Cosmic Forces
          </button>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Constellation */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-purple-400" />
              <h2 className="text-xl font-semibold text-purple-400">Stellar Workforce</h2>
            </div>
            <div className="space-y-4">
              {employees.map(employee => (
                <div key={employee.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{employee.name}</h3>
                    <div className="flex items-center gap-1">
                      <Activity size={14} className="text-green-400" />
                      <span className="text-green-400">{employee.energyLevel}%</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {employee.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" />
                    <div className="flex gap-1">
                      {employee.availability.map(hour => (
                        <span key={hour} className="w-5 h-5 flex items-center justify-center bg-gray-700 rounded-sm text-xs">
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tasks Nebula */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-400" />
              <h2 className="text-xl font-semibold text-blue-400">Task Nebula</h2>
            </div>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{task.name}</h3>
                    <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Clock size={14} className="text-amber-400" />
                    <span className="text-sm">{task.duration} hours</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {task.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cosmic Alignment Results */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-pink-400" />
              <h2 className="text-xl font-semibold text-pink-400">Cosmic Alignments</h2>
            </div>
            {allocations.length > 0 ? (
              <div className="space-y-4">
                {allocations.map(allocation => {
                  const task = tasks.find(t => t.id === allocation.taskId);
                  const employee = employees.find(e => e.id === allocation.employeeId);
                  return (
                    <div key={allocation.taskId} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{task.name}</h3>
                        <button 
                          onClick={() => viewEmployeeMatch(task.id)} 
                          className="text-xs px-2 py-1 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          View Match
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{employee.name}</span>
                          <span className="text-sm font-medium text-pink-400">{allocation.matchScore}% Match</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" 
                            style={{ width: `${allocation.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Star size={48} className="mb-4 opacity-50" />
                <p className="text-center">The cosmic forces are waiting to be aligned</p>
                <p className="text-center text-sm mt-2">Click "Align Cosmic Forces" to start the alignment process</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal modal for detailed match view */}
      {showModal && currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{currentTask.name} - Best Matches</h3>
            <div className="space-y-4 mb-6">
              {employees.map(employee => {
                const matchScore = calculateCosmicMatch(employee, currentTask);
                return (
                  <div key={employee.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <div className="flex gap-1 mt-1">
                        {currentTask.skills.map(skill => (
                          <span key={skill} className={`text-xs px-2 py-0.5 rounded-full ${employee.skills.includes(skill) ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-400'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={matchScore > 80 ? "text-green-400" : matchScore > 60 ? "text-amber-400" : "text-red-400"}>
                        {matchScore}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CosmicTaskAllocation;