import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Target, 
  Rocket,
  Clock,
  BarChart,
  Calendar,
  Medal
} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.5 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const CosmicWorkforceDashboard = () => {
  const [selectedView, setSelectedView] = useState('leaderboard');
  const [userData, setUserData] = useState({
    name: "Admin User",
    xp: 5230,
    level: 12
  });

  // Sample data - in a real app this would come from the backend
  const employeeLeaderboard = [
    { 
      rank: 1, 
      name: 'Sarah Johnson', 
      role: 'Senior Developer', 
      points: 4752, 
      efficiency: '95%', 
      badges: ['Top Performer', 'Innovation Leader']
    },
    { 
      rank: 2, 
      name: 'Michael Chen', 
      role: 'Product Manager', 
      points: 4521, 
      efficiency: '92%', 
      badges: ['Team Player', 'Strategic Thinker']
    },
    { 
      rank: 3, 
      name: 'Alex Rodriguez', 
      role: 'Data Analyst', 
      points: 4310, 
      efficiency: '88%', 
      badges: ['Data Wizard', 'Quick Learner']
    },
    { 
      rank: 4, 
      name: 'Emma Thompson', 
      role: 'UX Designer', 
      points: 4105, 
      efficiency: '85%', 
      badges: ['Creative Mind', 'User Advocate']
    }
  ];

  const teamChallenges = [
    { 
      title: 'Project Velocity Challenge', 
      description: 'Complete 5 projects ahead of schedule', 
      reward: '500 XP + Team Bonus', 
      progress: '3/5',
      completion: 0.6
    },
    { 
      title: 'Innovation Sprint', 
      description: 'Generate 3 breakthrough ideas', 
      reward: '750 XP + Recognition', 
      progress: '1/3',
      completion: 0.33
    },
    { 
      title: 'Customer Satisfaction Drive', 
      description: 'Achieve 95% satisfaction rating for two weeks', 
      reward: '800 XP + Special Badge', 
      progress: '1/2 weeks',
      completion: 0.5
    }
  ];

  const staffOptimizationData = [
    { department: 'Development', utilization: 87, efficiency: 92, recommendation: 'Consider 1 additional hire' },
    { department: 'Design', utilization: 91, efficiency: 89, recommendation: 'Optimal staffing' },
    { department: 'Marketing', utilization: 75, efficiency: 82, recommendation: 'Redistribute workload' },
    { department: 'Customer Support', utilization: 95, efficiency: 84, recommendation: 'High burnout risk - hire soon' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-x-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-5 -top-10 -left-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-5 top-1/3 -right-20 blur-3xl"></div>
        <div className="absolute w-80 h-80 rounded-full bg-pink-500 opacity-5 bottom-0 left-1/4 blur-3xl"></div>
        
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-lg p-6 flex justify-between items-center shadow-lg border-b border-gray-800"
        >
          <div className="flex items-center space-x-4">
            <Rocket className="text-blue-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Get Shift Done</h1>
              <p className="text-gray-400">AI-powered workforce planning</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800/50 rounded-full px-4 py-2 border border-blue-900">
              <Star className="mr-2 text-blue-400" />
              <span className="font-semibold text-blue-300">{userData.xp} XP</span>
            </div>
            <div className="flex items-center bg-gray-800/50 rounded-full px-4 py-2 border border-purple-900">
              <Shield className="mr-2 text-purple-400" />
              <span className="font-semibold text-purple-300">Level {userData.level}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center py-12 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            What if scheduling was automatic, intelligent, and stress-free?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Introducing "Get Shift Done", the AI-powered workforce planning solution
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mb-12"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-blue-900/50 hover:border-blue-700/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
              <Zap className="text-blue-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-blue-300 mb-2">AI-Powered Scheduling</h3>
            <p className="text-gray-400">
              Intelligent algorithms create optimal schedules based on your specific requirements
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-purple-900/50 hover:border-purple-700/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
              <Clock className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-purple-300 mb-2">Real-time Adaptation</h3>
            <p className="text-gray-400">
              Instantly adjust to changes, absences, and emergencies without disrupting workflow
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-pink-900/50 hover:border-pink-700/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-pink-900/30 flex items-center justify-center mb-4">
              <Medal className="text-pink-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-pink-300 mb-2">Staff Optimization</h3>
            <p className="text-gray-400">
              Balance workloads and maximize productivity across your entire workforce
            </p>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8">
          {/* Sidebar Navigation */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <button 
              onClick={() => setSelectedView('leaderboard')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                selectedView === 'leaderboard' 
                  ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white' 
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Trophy className="mr-3" /> Leaderboard
            </button>
            <button 
              onClick={() => setSelectedView('challenges')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                selectedView === 'challenges' 
                  ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white' 
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <Target className="mr-3" /> Team Challenges
            </button>
            <button 
              onClick={() => setSelectedView('optimization')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                selectedView === 'optimization' 
                  ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white' 
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <BarChart className="mr-3" /> Staff Optimization
            </button>
            <button 
              className="w-full flex items-center p-3 bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 rounded-lg"
            >
              <Users className="mr-3" /> Team Stats
            </button>
            <button 
              className="w-full flex items-center p-3 bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 rounded-lg"
            >
              <Award className="mr-3" /> Achievements
            </button>
            <button 
              className="w-full flex items-center p-3 bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 rounded-lg"
            >
              <Calendar className="mr-3" /> Schedule
            </button>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800"
          >
            {selectedView === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-300">
                  <Trophy className="mr-3 text-blue-400" /> Performance Leaderboard
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="p-3 text-left border-b border-gray-700">Rank</th>
                        <th className="p-3 text-left border-b border-gray-700">Name</th>
                        <th className="p-3 text-left border-b border-gray-700">Role</th>
                        <th className="p-3 text-center border-b border-gray-700">Points</th>
                        <th className="p-3 text-center border-b border-gray-700">Efficiency</th>
                        <th className="p-3 text-left border-b border-gray-700">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeLeaderboard.map((employee) => (
                        <motion.tr 
                          key={employee.rank} 
                          className="hover:bg-gray-800/30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: employee.rank * 0.1 }}
                        >
                          <td className="p-3 font-bold text-blue-400">#{employee.rank}</td>
                          <td className="p-3">{employee.name}</td>
                          <td className="p-3 text-gray-400">{employee.role}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center">
                              <Zap className="mr-2 text-blue-400" size={16} />
                              {employee.points}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">
                              {employee.efficiency}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              {employee.badges.map((badge) => (
                                <span 
                                  key={badge} 
                                  className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Team Challenges Content */}
            {selectedView === 'challenges' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center text-purple-300">
                  <Target className="mr-3 text-purple-400" /> Active Team Challenges
                </h2>
                <div className="space-y-4">
                  {teamChallenges.map((challenge, index) => (
                    <motion.div 
                      key={challenge.title} 
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-700/50 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                        <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">
                          {challenge.reward}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4">{challenge.description}</p>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${challenge.completion * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        ></motion.div>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        {challenge.progress} Completed
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Staff Optimization Content */}
            {selectedView === 'optimization' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center text-pink-300">
                  <BarChart className="mr-3 text-pink-400" /> Staff Optimization
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="p-3 text-left border-b border-gray-700">Department</th>
                        <th className="p-3 text-center border-b border-gray-700">Utilization</th>
                        <th className="p-3 text-center border-b border-gray-700">Efficiency</th>
                        <th className="p-3 text-left border-b border-gray-700">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffOptimizationData.map((dept, index) => (
                        <motion.tr 
                          key={dept.department} 
                          className="hover:bg-gray-800/30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="p-3 font-medium">{dept.department}</td>
                          <td className="p-3">
                            <div className="flex flex-col items-center">
                              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                                <motion.div 
                                  className={`h-full rounded-full ${
                                    dept.utilization > 90 ? 'bg-red-500' : 
                                    dept.utilization > 80 ? 'bg-green-500' : 'bg-yellow-500'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dept.utilization}%` }}
                                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                ></motion.div>
                              </div>
                              <span className="text-sm">{dept.utilization}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col items-center">
                              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                                <motion.div 
                                  className="bg-blue-500 h-full rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dept.efficiency}%` }}
                                  transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                                ></motion.div>
                              </div>
                              <span className="text-sm">{dept.efficiency}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              dept.recommendation.includes('hire') ? 'bg-blue-900/30 text-blue-300' : 
                              dept.recommendation.includes('Optimal') ? 'bg-green-900/30 text-green-300' :
                              dept.recommendation.includes('risk') ? 'bg-red-900/30 text-red-300' : 
                              'bg-yellow-900/30 text-yellow-300'
                            }`}>
                              {dept.recommendation}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/80 backdrop-blur-lg p-6 border-t border-gray-800 mt-12">
        <div className="text-center text-gray-500">
          <p>© 2025 Get Shift Done. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default home;