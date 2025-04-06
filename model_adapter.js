import Papa from 'papaparse';
import TaskAllocationML from './mlmodel.js'; // Assuming mlmodel.js is in the same directory

class MLAdapter {
  constructor() {
    this.mlModel = new TaskAllocationML();
    this.initialized = false;
  }

  async initialize() {
    if (!this.initialized) {
      await this.mlModel.initialize();
      
      // If you have historical data, you can train the model here
      const sampleTrainingData = this.mlModel.generateSampleTrainingData();
      await this.mlModel.trainModel(sampleTrainingData);
      
      this.initialized = true;
    }
    return this.initialized;
  }

  // Load employees from CSV
  async loadEmployeesFromCSV(csvFile) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          const employees = results.data
            .filter(row => row.id && row.name) // Filter out incomplete rows
            .map(employee => ({
              id: parseInt(employee.id),
              name: employee.name,
              skills: employee.skills.split(',').map(skill => skill.trim()),
              availability: employee.availability.split(',').map(hour => parseInt(hour.trim())),
              energyLevel: parseInt(employee.energyLevel),
              performance: parseInt(employee.performance),
              completedTasks: parseInt(employee.completedTasks)
            }));
          resolve(employees);
        },
        error: (error) => reject(error)
      });
    });
  }

  // Load tasks from CSV
  async loadTasksFromCSV(csvFile) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          const tasks = results.data
            .filter(row => row.id && row.name) // Filter out incomplete rows
            .map(task => ({
              id: parseInt(task.id),
              name: task.name,
              skills: task.skills.split(',').map(skill => skill.trim()),
              duration: parseInt(task.duration),
              priority: task.priority,
              deadline: task.deadline,
              status: task.status
            }));
          resolve(tasks);
        },
        error: (error) => reject(error)
      });
    });
  }

  // Find the best employee-task allocations
  async allocateTasks(employees, tasks) {
    await this.initialize();
    
    // Get match scores for all employee-task combinations
    const allMatches = await this.mlModel.findBestMatches(employees, tasks);
    
    // Create allocations based on scores and availability
    const allocations = [];
    const employeeCopy = [...employees];
    
    // Sort tasks by priority
    const priorityOrder = { "Critical": 3, "High": 2, "Medium": 1, "Low": 0 };
    const sortedMatches = [...allMatches].sort((a, b) => {
      return priorityOrder[b[0].task.priority] - priorityOrder[a[0].task.priority];
    });
    
    for (const taskMatches of sortedMatches) {
      const task = taskMatches[0].task;
      let allocated = false;
      
      for (const match of taskMatches) {
        // Find employee in our copy (to track updated availability)
        const employeeIndex = employeeCopy.findIndex(e => e.id === match.employee.id);
        if (employeeIndex === -1) continue; // Employee already fully booked
        
        const employee = employeeCopy[employeeIndex];
        
        // Find available time slot
        let startHour = -1;
        for (let i = 0; i < employee.availability.length; i++) {
          const hour = employee.availability[i];
          let hasConsecutiveSlots = true;
          
          for (let j = 0; j < task.duration; j++) {
            if (!employee.availability.includes(hour + j)) {
              hasConsecutiveSlots = false;
              break;
            }
          }
          
          if (hasConsecutiveSlots) {
            startHour = hour;
            break;
          }
        }
        
        if (startHour !== -1) {
          // Create allocation
          allocations.push({
            task,
            employee: match.employee,
            matchScore: match.score,
            startHour
          });
          
          // Update employee availability
          const updatedEmployee = {...employee};
          for (let i = 0; i < task.duration; i++) {
            updatedEmployee.availability = updatedEmployee.availability
              .filter(hour => hour !== startHour + i);
          }
          employeeCopy[employeeIndex] = updatedEmployee;
          
          allocated = true;
          break;
        }
      }
      
      if (!allocated) {
        console.log(`Could not allocate task: ${task.name}`);
      }
    }
    
    return allocations;
  }
  
  // Export allocations to CSV
  exportAllocationsToCSV(allocations) {
    const data = allocations.map(allocation => ({
      taskId: allocation.task.id,
      taskName: allocation.task.name,
      employeeId: allocation.employee.id,
      employeeName: allocation.employee.name,
      startHour: allocation.startHour,
      endHour: allocation.startHour + allocation.task.duration,
      matchScore: allocation.matchScore
    }));
    
    return Papa.unparse(data);
  }
}

export default MLAdapter;