import * as tf from '@tensorflow/tfjs';

class TaskAllocationML {
  constructor() {
    this.model = null;
    this.initialized = false;
    this.normalizeParams = {
      skillMatch: { min: 0, max: 1 },
      energyLevel: { min: 0, max: 100 },
      performance: { min: 0, max: 100 },
      taskUrgency: { min: 0, max: 3 }, // Based on priority levels
      taskDuration: { min: 1, max: 8 }
    };
  }

  async initialize() {
    try {
      // Create a simple neural network model
      this.model = tf.sequential();
      
      // Input layer with 5 features
      this.model.add(tf.layers.dense({
        inputShape: [5],
        units: 10,
        activation: 'relu'
      }));
      
      // Hidden layer
      this.model.add(tf.layers.dense({
        units: 8,
        activation: 'relu'
      }));
      
      // Output layer - predicting match score between 0-100
      this.model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
      }));
      
      // Compile the model
      this.model.compile({
        optimizer: tf.train.adam(),
        loss: 'meanSquaredError'
      });
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Error initializing ML model:", error);
      return false;
    }
  }

  // Load a pre-trained model if available
  async loadModel(modelUrl) {
    try {
      this.model = await tf.loadLayersModel(modelUrl);
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Error loading pre-trained model:", error);
      return false;
    }
  }

  // Train the model with historical allocation data
  async trainModel(trainingData) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Format data for training
      const inputs = [];
      const outputs = [];
      
      trainingData.forEach(item => {
        // Features: skillMatch, energyLevel, performance, taskUrgency, taskDuration
        inputs.push([
          this.normalize(item.skillMatch, 'skillMatch'),
          this.normalize(item.energyLevel, 'energyLevel'),
          this.normalize(item.performance, 'performance'),
          this.normalize(item.taskUrgency, 'taskUrgency'),
          this.normalize(item.taskDuration, 'taskDuration')
        ]);
        
        // Target: success score (normalized to 0-1)
        outputs.push([item.successScore / 100]);
      });
      
      const xs = tf.tensor2d(inputs);
      const ys = tf.tensor2d(outputs);
      
      // Train the model
      await this.model.fit(xs, ys, {
        epochs: 50,
        batchSize: 32,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
          }
        }
      });
      
      // Clean up tensors
      xs.dispose();
      ys.dispose();
      
      return true;
    } catch (error) {
      console.error("Error training model:", error);
      return false;
    }
  }

  // Normalize input values to 0-1 range
  normalize(value, feature) {
    const { min, max } = this.normalizeParams[feature];
    return (value - min) / (max - min);
  }

  // Calculate skill match between employee and task
  calculateSkillMatch(employeeSkills, taskSkills) {
    if (taskSkills.length === 0) return 0;
    const matchingSkills = taskSkills.filter(skill => employeeSkills.includes(skill));
    return matchingSkills.length / taskSkills.length;
  }
  
  // Convert priority to numeric urgency value
  getPriorityUrgency(priority) {
    const priorityMap = {
      "Critical": 3,
      "High": 2, 
      "Medium": 1,
      "Low": 0
    };
    return priorityMap[priority] || 0;
  }

  // Calculate match score using the trained model
  async predictMatchScore(employee, task) {
    if (!this.initialized || !this.model) {
      return this.fallbackMatchCalculation(employee, task);
    }
    
    try {
      // Calculate skill match
      const skillMatch = this.calculateSkillMatch(employee.skills, task.skills);
      
      // Prepare input features
      const inputFeatures = [
        this.normalize(skillMatch, 'skillMatch'),
        this.normalize(employee.energyLevel, 'energyLevel'),
        this.normalize(employee.performance, 'performance'),
        this.normalize(this.getPriorityUrgency(task.priority), 'taskUrgency'),
        this.normalize(task.duration, 'taskDuration')
      ];
      
      // Make prediction
      const inputTensor = tf.tensor2d([inputFeatures]);
      const prediction = await this.model.predict(inputTensor);
      const score = prediction.dataSync()[0] * 100;
      
      // Clean up tensor
      inputTensor.dispose();
      prediction.dispose();
      
      return Math.round(score);
    } catch (error) {
      console.error("Error predicting match score:", error);
      return this.fallbackMatchCalculation(employee, task);
    }
  }

  // Fallback calculation in case ML prediction fails
  fallbackMatchCalculation(employee, task) {
    const skillMatch = this.calculateSkillMatch(employee.skills, task.skills);
    const energyFactor = employee.energyLevel / 100;
    const performanceFactor = employee.performance / 100;
    return Math.round((skillMatch * 0.5 + energyFactor * 0.2 + performanceFactor * 0.3) * 100);
  }

  // Batch predict for all employee-task combinations
  async findBestMatches(employees, tasks) {
    const results = [];

    for (const task of tasks) {
      const taskMatches = [];

      for (const employee of employees) {
        const score = await this.predictMatchScore(employee, task);
        taskMatches.push({
          employee,
          task,
          score
        });
      }

      // Sort matches by score (descending)
      taskMatches.sort((a, b) => b.score - a.score);
      results.push(taskMatches);
    }

    return results;
  }

  // Generate sample training data based on historical performance
  generateSampleTrainingData() {
    // This would typically come from your backend with real historical data
    return [
      { skillMatch: 1.0, energyLevel: 85, performance: 92, taskUrgency: 2, taskDuration: 3, successScore: 95 },
      { skillMatch: 0.5, energyLevel: 90, performance: 88, taskUrgency: 1, taskDuration: 4, successScore: 75 },
      { skillMatch: 0.0, energyLevel: 78, performance: 85, taskUrgency: 3, taskDuration: 2, successScore: 40 },
      { skillMatch: 1.0, energyLevel: 65, performance: 75, taskUrgency: 0, taskDuration: 5, successScore: 60 },
      { skillMatch: 0.7, energyLevel: 95, performance: 90, taskUrgency: 2, taskDuration: 1, successScore: 85 },
      // Add more sample data as needed
    ];
  }
}

export default TaskAllocationML;