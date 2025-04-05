import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BarChart2, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Landingpage= () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  
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
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Hover animations
  const hoverEffect = {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
    
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10"></div>
        
        <div className="stars absolute inset-0">
          {[...Array(100)].map((_, i) => {
            const size = Math.random() * 2;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const animationDuration = 3 + Math.random() * 7;
            const delay = Math.random() * 2;
            
            return (
              <motion.div 
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: animationDuration,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      </div>

      
      <div className="hidden lg:block">
        <motion.div 
          className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-500/30 blur-md"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-purple-500/20 blur-md"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-pink-500/20 blur-md"
          animate={{ 
            x: [0, 15, 0],
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      
      <motion.header 
        className="relative z-10 py-4 px-6 md:px-12 flex justify-between items-center backdrop-blur-sm"
        style={{ opacity: headerOpacity }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            GET SHIFT DONE
          </h1>
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {['Features', 'Benefits', 'Contact'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-blue-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                color: "#60a5fa",
                transition: { duration: 0.2 }
              }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <motion.button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-medium"
            whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 8px rgba(120, 80, 220, 0.7)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowLoginModal(true)}
        >
            Sign in
        </motion.button>
      </motion.header>

      <motion.section 
        className="relative z-10 pt-20 pb-32 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center"
        style={{ scale: heroScale }}
      >
        <motion.div 
          className="w-full lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              Less Hassle,
            </motion.span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              More Hustle!
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            AI-powered workforce planning that eliminates scheduling chaos, 
            maximizes efficiency, and adapts in real-time.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-medium hover:shadow-lg transition duration-300 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(120, 80, 220, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started 
              <motion.svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatType: "reverse"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
            <motion.button 
              className="bg-transparent border border-purple-500 px-8 py-3 rounded-full font-medium hover:bg-purple-500/10 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="w-full lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative mx-auto max-w-md">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Dashboard mockup */}
            <motion.div 
              className="relative z-10 rounded-lg shadow-2xl bg-gray-900 border border-purple-500/20 p-4"
              whileHover={{ 
                y: -5,
                boxShadow: "0px 10px 30px -5px rgba(120, 80, 220, 0.5)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-4 w-20 mb-4 bg-purple-500/20 rounded-full"></div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <motion.div 
                  className="bg-gray-800 rounded-lg p-3 h-24"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-3 w-16 bg-blue-500/30 rounded-full mb-2"></div>
                  <motion.div 
                    className="h-8 w-8 bg-blue-500/20 rounded-full mt-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <motion.div 
                  className="bg-gray-800 rounded-lg p-3 h-24"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-3 w-12 bg-purple-500/30 rounded-full mb-2"></div>
                  <motion.div 
                    className="h-8 w-8 bg-purple-500/20 rounded-full mt-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 h-32 mb-4">
                <div className="flex justify-between mb-4">
                  <div className="h-3 w-20 bg-pink-500/30 rounded-full"></div>
                  <div className="h-3 w-8 bg-pink-500/20 rounded-full"></div>
                </div>
                <div className="grid grid-cols-7 gap-1 h-16">
                  {[35, 25, 55, 45, 65, 40, 50].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-gradient-to-t from-blue-500/20 to-purple-500/20 rounded-sm" 
                      initial={{ height: "0%" }}
                      animate={{ height: `${h}%` }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.1,
                        type: "spring"
                      }}
                      whileHover={{ 
                        y: -2,
                        backgroundColor: "rgba(130, 90, 230, 0.3)"
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.div 
                  className="h-3 w-3 rounded-full bg-blue-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="h-3 w-3 rounded-full bg-purple-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
                <motion.div 
                  className="h-3 w-3 rounded-full bg-pink-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Problem Section */}
      <section id="problem" className="relative z-10 py-20 bg-gray-900/40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
              The Scheduling Problem
            </span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Calendar className="w-12 h-12 text-red-400" />, title: "Scheduling Bottlenecks", text: "Operations slow down due to inefficient schedule planning" },
              { icon: <Clock className="w-12 h-12 text-orange-400" />, title: "Last-minute Changes", text: "Unexpected changes create chaos in workforce management" },
              { icon: <Users className="w-12 h-12 text-yellow-400" />, title: "Staff Utilization", text: "Underutilization and overburdening hurt productivity" },
              { icon: <BarChart2 className="w-12 h-12 text-red-400" />, title: "Manual Planning", text: "Wastes valuable time and resources on tedious tasks" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl"
                variants={itemVariants}
                whileHover={hoverEffect}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                What if scheduling was automatic, intelligent, and stress-free?
              </motion.span>
            </h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Introducing "Get Shift Done", the AI-powered workforce planning solution
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Zap className="w-10 h-10 text-blue-400" />, title: "AI-Powered Scheduling", text: "Intelligent algorithms create optimal schedules based on your specific requirements" },
              { icon: <Clock className="w-10 h-10 text-purple-400" />, title: "Real-time Adaptation", text: "Instantly adjust to changes, absences, and emergencies without disrupting workflow" },
              { icon: <Award className="w-10 h-10 text-pink-400" />, title: "Staff Optimization", text: "Balance workloads and maximize productivity across your entire workforce" },
              { icon: <Calendar className="w-10 h-10 text-blue-400" />, title: "Predictive Planning", text: "Anticipate scheduling needs based on historical data and trends" },
              { icon: <Users className="w-10 h-10 text-purple-400" />, title: "Employee Preferences", text: "Account for staff availability and preferences to boost satisfaction" },
              { icon: <BarChart2 className="w-10 h-10 text-pink-400" />, title: "Performance Analytics", text: "Gain valuable insights to continually improve scheduling efficiency" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
                variants={itemVariants}
                whileHover={hoverEffect}
              >
                <motion.div 
                  className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 py-24 px-6 md:px-12">
        <motion.div 
          className="container mx-auto max-w-4xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-12 border border-purple-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ 
            boxShadow: "0px 0px 30px rgba(120, 80, 220, 0.3)",
            scale: 1.01
          }}
          animate={{
            boxShadow: ["0px 0px 0px rgba(120, 80, 220, 0.0)", "0px 0px 20px rgba(120, 80, 220, 0.3)", "0px 0px 0px rgba(120, 80, 220, 0.0)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Ready to revolutionize your workforce planning?
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Focus on what truly matters while Get Shift Done handles the scheduling chaos.
            </motion.p>
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-full font-medium text-lg hover:shadow-lg transition duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(120, 80, 220, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Get Started Today
            </motion.button>
            <motion.p 
              className="mt-4 text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Less Hastle More Hustle
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/70 py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                GET SHIFT DONE
              </h2>
              <p className="text-gray-400 mt-2">Less Hassle, More Hustle!</p>
            </motion.div>
            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  whileHover={{ 
                    scale: 1.2,
                    color: "#ffffff"
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p>&copy; {new Date().getFullYear()} HYTECH. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Login Modal */}
    <AnimatePresence>
        {showLoginModal && (
        <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
        {/* Backdrop */}
        <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginModal(false)}
        />
      
        {/* Modal Content */}
        <motion.div 
            className="bg-gray-900 border border-purple-500/30 rounded-xl w-full max-w-md p-6 relative z-10"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
        >
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Welcome Back
            </h3>
            <motion.button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowLoginModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </motion.button>
            </div>
        
            <form className="space-y-4">
            <div>
                <label className="block text-gray-300 mb-1 text-sm">Email</label>
                <motion.input 
                type="email" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileFocus={{ scale: 1.01 }}
                placeholder="your@email.com"
                />
            </div>
            
            <div>
                <label className="block text-gray-300 mb-1 text-sm">Password</label>
                <motion.input 
                type="password" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileFocus={{ scale: 1.01 }}
                placeholder="••••••••"
                />
            </div>
          
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                </label>
                </div>
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
                </a>
            </div>
          
            <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-lg font-medium mt-2"
                whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 0px 8px rgba(120, 80, 220, 0.7)" 
                }}
                whileTap={{ scale: 0.98 }}
            >
                Sign in
            </motion.button>
            </form>
        
            <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign up
            </a>
            </div>
        </motion.div>
        </motion.div>
    )}
    </AnimatePresence>

    </div>
  );
};

export default Landingpage;