import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlobCursor from './components/BlobCursor';
import { Github, Linkedin, Instagram, Book, Briefcase, GraduationCap, Menu, X } from 'lucide-react';
import { SplineScene } from './components/ui/splite';
import { Card } from './components/ui/card';
import { QuoteAnimation } from './components/QuoteAnimation';
import { AnimatedTestimonials } from './components/ui/animated-testimonials';
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconMail, IconPhone } from '@tabler/icons-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    // Show content immediately, but load heavy assets in the background
    setShowContent(true);
    
    // Lazy load the Spline scene
    const loadSpline = async () => {
      try {
        // Dynamically import the Spline component
        const { SplineScene } = await import('./components/ui/splite');
        // Set a flag when loaded
        setIsSplineLoaded(true);
      } catch (error) {
        console.error('Failed to load Spline scene:', error);
      }
    };
    
    // Start loading after initial render
    const timer = setTimeout(() => {
      loadSpline();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Let's Talk" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BlobCursor />
      <QuoteAnimation />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Navigation Bar */}
            <motion.nav 
              className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800/50"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                  {/* Logo with animation */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <motion.h1 
                      className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      ANUSH<span className="text-white">NAIK</span>
                    </motion.h1>
                  </motion.div>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-1">
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="relative group"
                      >
                        <button
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsMenuOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            window.location.hash === `#${section.id}` 
                              ? 'text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {section.label}
                        </button>
                        <motion.div 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                          initial={false}
                          animate={{
                            scaleX: window.location.hash === `#${section.id}` ? 1 : 0,
                            opacity: window.location.hash === `#${section.id}` ? 1 : 0.8
                          }}
                        />
                      </motion.div>
                    ))}
                    
                    {/* Contact Button */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (sections.length * 0.1) }}
                    >
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Get In Touch
                      </button>
                    </motion.div>
                  </div>

                  {/* Mobile Menu Button */}
                  <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6 text-white" />
                    ) : (
                      <Menu className="w-6 h-6 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="md:hidden overflow-hidden"
                  >
                    <div className="container mx-auto px-4 py-3 space-y-2">
                      {sections.map((section, index) => (
                        <motion.button
                          key={section.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsMenuOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            window.location.hash === `#${section.id}`
                              ? 'bg-zinc-800/50 text-white'
                              : 'text-gray-400 hover:bg-zinc-800/30 hover:text-white'
                          }`}
                        >
                          {section.label}
                        </motion.button>
                      ))}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            scrollToSection('contact');
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        >
                          Get In Touch
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated border bottom */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen relative overflow-hidden pt-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto px-4 py-20"
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2">
                    <motion.h1
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl md:text-7xl font-bold mb-6"
                    >
                      ANUSH
                      <br />
                      <span className="text-blue-500">NAIK</span>
                    </motion.h1>
                    <motion.p
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl text-gray-400 mb-8"
                    >
                      Full-stack developer with expertise in React.js, Node.js, and MongoDB
                    </motion.p>
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex space-x-4"
                    >
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                        <Github size={24} />
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                        <Linkedin size={24} />
                      </a>
                      <a href="https://www.instagram.com/_anush_s_n_35/profilecard/?igsh=NWI4ZXFrcHlhcmgx" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                        <Instagram size={24} />
                      </a>
                    </motion.div>
                    <div className="text-lg text-gray-400 mb-8">
                      Full Stack Developer | AI & ML Enthusiast
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="#contact"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection('contact');
                        }}
                      >
                        Contact Me
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1Jksee_gfJa2KyXSkd0RXIY3WWxIXm00y/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Resume
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/2 h-[500px] relative">
                    {isSplineLoaded ? (
                      <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900/50 rounded-lg flex items-center justify-center">
                        <div className="animate-pulse text-zinc-600">Loading 3D Model...</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* About Me Section */}
            <section id="about" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-dots-white/[0.02] -z-10" />
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div 
                      className="w-full md:w-1/3"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                        <img 
                          src="/Anush.png" 
                          alt="Anush Naik" 
                          className="relative w-full h-auto rounded-2xl border-2 border-zinc-800/50 shadow-2xl"
                        />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="w-full md:w-2/3"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className="text-blue-500 font-medium mb-4 inline-block">GET TO KNOW ME</span>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        About Me
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>
                      
                      <div className="space-y-4 text-gray-300">
                        <p>
                          Hello! I'm Anush Naik, a passionate and dedicated Computer Science student with a keen interest in software development and emerging technologies.
                        </p>
                        <p>
                          With a strong foundation in programming and problem-solving, I enjoy turning complex problems into simple, beautiful, and intuitive solutions. My journey in technology has been driven by curiosity and a desire to create meaningful digital experiences.
                        </p>
                        <p>
                          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
                        </p>
                      </div>
                      
                      <div className="mt-8 flex flex-wrap gap-4">
                        <div className="bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-700/50">
                          <span className="text-blue-400">Name:</span> Anush Naik
                        </div>
                        <div className="bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-700/50">
                          <span className="text-blue-400">Email:</span> anushnaik951@gmail.com
                        </div>
                        <div className="bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-700/50">
                          <span className="text-blue-400">From:</span>  SIRSI,Karnataka, India
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] -z-10" />
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto text-center mb-16"
                >
                  <span className="text-blue-500 font-medium mb-4 inline-block">ACADEMIC JOURNEY</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Education & Qualifications
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                  {/* Vertical timeline line */}
                  <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block" />
                  
                  {[
                    {
                      title: "B.E in Computer Science",
                      institution: "G M INSTITUTE OF TECHNOLOGY",
                      year: "2022 - 2026",
                      description: "Pursuing Bachelor's degree with focus on Software Development, AI, and Machine Learning",
                      icon: <GraduationCap className="w-5 h-5" />,
                      color: "from-blue-500 to-blue-600",
                      skills: ["Data Structures", "Algorithms", "DBMS", "AI/ML", "Web Development"],
                      achievements: ["Active in coding competitions"]
                    },
                    {
                      title: "Pre-University (PCMB)",
                      institution: "Jawahar Navodaya Vidyalaya, Mundgod",
                      year: "2020 - 2022",
                      description: "Completed with distinction in Physics, Chemistry, Mathematics, and Biology",
                      icon: <Book className="w-5 h-5" />,
                      color: "from-purple-500 to-purple-600",
                      skills: ["Mathematics", "Physics", "Chemistry", "Biology"],
                      achievements: []
                    },
                    {
                      title: "Secondary Education (10th)",
                      institution: "Jawahar Navodaya Vidyalaya, Mundgod",
                      year: "2015 - 2020",
                      description: "Completed with academic excellence and active participation in extracurricular activities",
                      icon: <Book className="w-5 h-5" />,
                      color: "from-pink-500 to-pink-600",
                      skills: ["Science", "Mathematics", "Social Studies", "Languages"],
                      achievements: []
                    }
                  ].map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`mb-12 md:mb-16 relative ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'}`}
                    >
                      <div className={`bg-gradient-to-br ${edu.color} p-0.5 rounded-2xl shadow-lg group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300`}>
                        <div className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 h-full relative overflow-hidden">
                          {/* Animated background effect */}
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="flex flex-col md:flex-row md:items-start">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${edu.color} flex items-center justify-center mr-6 mb-4 md:mb-0 flex-shrink-0`}>
                              {edu.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                                  <p className="text-blue-300 font-medium">{edu.institution}</p>
                                </div>
                                <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 border border-blue-500/20">
                                  {edu.year}
                                </span>
                              </div>
                              
                              <p className="text-gray-300 mt-3 leading-relaxed">{edu.description}</p>
                              
                              {/* Degree progress removed */}
                              
                              {/* Skills */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {edu.skills.map((skill, i) => (
                                  <motion.span
                                    key={i}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + (i * 0.05) }}
                                    className="px-2.5 py-1 text-xs rounded-full bg-zinc-800/50 text-gray-300 border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors duration-200"
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                              
                              {/* Achievements */}
                              <div className="mt-4 space-y-2">
                                {edu.achievements.map((achievement, i) => (
                                  <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-start"
                                  >
                                    <svg 
                                      className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor"
                                    >
                                      <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M5 13l4 4L19 7" 
                                      />
                                    </svg>
                                    <span className="text-sm text-gray-400">{achievement}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute top-6 left-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 border-4 border-zinc-900 z-10" />
                      
                      {/* Connecting line */}
                      <div className="hidden md:block absolute top-6 left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 transform -translate-x-1/2 -z-10" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Hackathons Section */}
            <section id="hackathons" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-dots-white/[0.02] -z-10" />
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto text-center mb-12"
                >
                  <span className="text-purple-500 font-medium mb-4 inline-block">ACHIEVEMENTS</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    Hackathons Won
                  </h2>
                  <p className="text-lg text-gray-400">Showcasing my problem-solving skills and innovative thinking through competitive coding challenges</p>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                  {[
                    {
                      title: "HACK FOR HIRE",
                      position: "1st Place",
                      description: "Developed an AI-powered Agri product delivery webapp using React and Node.js",
                      date: "March 2024",
                      image: "/hackathons/IMG-20250721-WA0080.jpg"
                    },
                    {
                      title: "IDEATHON",
                      position: "Best Innovation Award",
                      description: "Gave best solution for Sustainable Development Goals",
                      date: "February 2024",
                      image: "/hackathons/IMG-20250721-WA0081.jpg"
                    },
                    {
                      title: "TechForGood Challenge",
                      position: "1st Runner Up",
                      description: "Developed a best Solution for Social Impact",
                      date: "January 2024",
                      image: "/hackathons/IMG-20250721-WA0082.jpg"
                    },
                    {
                      title: "Spark",
                      position: "Best AIML model Award",
                      description: "Developed a best AIML model for oralcancer detection",
                      date: "December 2024",
                      image: "/hackathons/IMG-20250721-WA0083.jpg"
                    },
                    {
                      title: "AI Innovation Summit at NITK",
                      position: "1st Place",
                      description: "Awarded as best innovation Award and Media Award",
                      date: "November 2023",
                      image: "/hackathons/IMG-20250721-WA0084.jpg"
                    },
                    {
                      title: "AI Hackathon at JIT Bangalore",
                      position: "Best AI model Award",
                      description: "Developed a best AIML model for Stock Price Detection",
                      date: "October 2024",
                      image: "/hackathons/IMG-20250721-WA0085.jpg"
                    },
                    {
                      title: "Cloud Native Hack",
                      position: "Best Use of AWS",
                      description: "Created a serverless microservices architecture",
                      date: "September 2023",
                      image: "/hackathons/IMG-20250721-WA0086.jpg"
                    },
                    {
                      title: "HackForGood",
                      position: "Community Choice",
                      description: "Developed a disease predictor model",
                      date: "July 2024",
                      image: "/hackathons/IMG-20250721-WA0087.jpg"
                    },
                    {
                      title: "Hack to Future",
                      position: "Finalist",
                      description: "Selected as top 10 finalist among 2000+ participants",
                      date: "June 2024",
                      image: "/hackathons/IMG-20250721-WA0088.jpg"
                    }
                  ].map((hackathon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 z-10" />
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <img 
                              src={hackathon.image} 
                              alt={hackathon.title} 
                              className="w-full h-full object-cover absolute inset-0" 
                              onError={(e) => {
                                // Fallback to trophy emoji if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.parentElement?.querySelector('.fallback-emoji') as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <span className="text-4xl text-zinc-600 fallback-emoji" style={{ display: 'none' }}>🏆</span>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {hackathon.position}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2">{hackathon.title}</h3>
                          <p className="text-gray-400 text-sm mb-2 flex-1">{hackathon.description}</p>
                          <div className="mt-4 pt-4 border-t border-zinc-800">
                            <span className="text-xs text-gray-500">{hackathon.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-16"
                >
                  <p className="text-gray-400 mb-6">Interested in seeing more of my projects?</p>
                  <a
                    href="#projects"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
                  >
                    View All Projects
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 -z-10" />
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto text-center mb-16"
                >
                  <span className="text-purple-500 font-medium mb-4 inline-block">PROFESSIONAL JOURNEY</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    Work Experience
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                  {/* Vertical timeline line */}
                  <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent transform -translate-x-1/2 hidden md:block" />
                  
                  {[
                    {
                      role: "Junior Web Developer",
                      company: "Kakud Pvt. Ltd",
                      duration: "Jan 2024 - Present",
                      location: "Shivamogga, India",
                      description: "Developing and maintaining web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
                      skills: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "REST APIs"],
                      icon: <Briefcase className="w-5 h-5" />,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      role: "Data Science with AI Intern",
                      company: "LabMentix",
                      duration: "Jan 2025",
                      location: "Bangalore, India",
                      description: "Worked on machine learning models and data analysis projects. Gained hands-on experience with Python, TensorFlow, and data visualization tools.",
                      skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Pandas", "Numpy"],
                      icon: <Briefcase className="w-5 h-5" />,
                      color: "from-purple-500 to-purple-600"
                    }
                  ].map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`mb-12 md:mb-16 relative ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'}`}
                    >
                      <div className={`bg-gradient-to-br ${exp.color} p-0.5 rounded-2xl shadow-lg group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300`}>
                        <div className="bg-zinc-900 rounded-2xl p-6 h-full relative overflow-hidden">
                          {/* Animated background effect */}
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="flex flex-col md:flex-row md:items-start">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${exp.color} flex items-center justify-center mr-6 mb-4 md:mb-0 flex-shrink-0`}>
                              {exp.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                  <p className="text-blue-300 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full inline-block">
                                    {exp.duration}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">{exp.location}</p>
                                </div>
                              </div>
                              
                              <p className="text-gray-400 mt-3 leading-relaxed">{exp.description}</p>
                              
                              {/* Skills */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {exp.skills.map((skill, i) => (
                                  <motion.span
                                    key={i}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.05) }}
                                    className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-gray-300 border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors duration-200"
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                              
                              {/* View Project Button */}
                              <motion.button
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 group"
                              >
                                View Projects
                                <svg
                                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute top-8 left-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 border-4 border-zinc-900 z-10" />
                      
                      {/* Connecting line */}
                      <div className="hidden md:block absolute top-8 left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 transform -translate-x-1/2 -z-10" />
                    </motion.div>
                  ))}
                  
                  {/* View More Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-16"
                  >
                    <a
                      href="#"
                      className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                    >
                      View Full Resume
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Blood Bank Management",
                      description: "A comprehensive blood bank management system",
                      image: "/images/blood-bank.jpeg",
                      tech: ["React", "Node.js", "MongoDB"],
                      link: "https://astonishing-dragon-85d6b7.netlify.app/"
                    },
                    {
                      title: "Stock Market Prediction",
                      description: "AI-powered stock market prediction system",
                      image: "/images/Stockmarket.png",
                      tech: ["Python", "TensorFlow", "React"],
                      link: "https://scintillating-khapse-f612dd.netlify.app/"
                    },
                    {
                      title: "E-commerce Platform",
                      description: "Modern e-commerce platform with real-time updates",
                      image: "/images/ecommerce.jpg",
                      tech: ["Next.js", "Firebase", "Stripe"],
                      link: "https://charming-sprite-ff17a2.netlify.app/"
                    },
                    {
                      title: "Oral Cancer Detection Model",
                      description: "A model which helps to detect oral cancer in early stage.{Its not completed}",
                      image: "/images/Oralcancer.jpg",
                      tech: ["python","React","TensorFlow"],
                      link: "https://oralcancerpredfin.onrender.com/"
                    },
                    {
                      title: "Teertha Photography",
                      description: "A Portfolio Website for My client who is a Photographer",
                      image: "/images/Teerthaphotography.png",
                      tech: ["Next.js", "React.js", "Framer","MongoDB"],
                      link: "https://teerthapphotography.netlify.app/"
                    },
                    {
                      title: "Image FIlter Frontend",
                      description: "A Frontend Project Which helps the people to filter theier images",
                      image: "/images/ImageFilter.png",
                      tech: ["Next.js", "React.js", "Framer","MongoDB"],
                      link: "https://incomparable-parfait-145e5f.netlify.app/"
                    }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group relative rounded-xl overflow-hidden"
                      onClick={() => project.link !== "#" && window.open(project.link, '_blank')}
                      style={{ cursor: project.link !== "#" ? 'pointer' : 'default' }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-glow">{project.title}</h3>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm text-white backdrop-blur-sm
                                       hover:bg-white/20 hover:text-glow transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Technical Skills
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {[
                    { icon: "/icons/react.svg", name: "React" },
                    { icon: "/icons/node.svg", name: "Node.js" },
                    { icon: "/icons/mongodb.svg", name: "MongoDB" },
                    { icon: "/icons/typescript.svg", name: "TypeScript" },
                    { icon: "/icons/python.svg", name: "Python" },
                    { icon: "/icons/javascript.svg", name: "JavaScript" },
                    { icon: "/icons/html5.svg", name: "HTML5" },
                    { icon: "/icons/css3.svg", name: "CSS3" },
                    { icon: "/icons/tailwind.svg", name: "Tailwind" },
                    { icon: "/icons/git.svg", name: "Git" },
                    { icon: "/icons/firebase.svg", name: "Firebase" },
                    { icon: "/icons/tensorflow.svg", name: "TensorFlow" }
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                      }}
                      className="flex flex-col items-center hover:text-glow transition-all duration-300"
                    >
                      <div className="w-16 h-16 mb-2">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <p className="text-center text-gray-400 hover:text-white">{skill.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-zinc-900/50">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Testimonials
                </motion.h2>
                <AnimatedTestimonials
                  testimonials={[
                    {
                      quote: "An exceptional developer who consistently delivers high-quality work. Their expertise in full-stack development and AI has been invaluable to our projects.",
                      name: "Shivraj N",
                      designation: "CEO at Kakud Pvt. Ltd",
                      src: "/images/shivu.jpeg"
                    },
                    {
                      quote: "Demonstrated strong capabilities in data science and AI during their internship. Their work on our machine learning models was particularly impressive.",
                      name: "Chirushree",
                      designation: "Lead Researcher at LabMentix",
                      src: "/images/Ammu.jpeg"
                    },
                    {
                      quote: "Created an amazing portfolio website for my photography business. The attention to detail and creative design choices really made my work stand out.",
                      name: "Teertha Photography",
                      designation: "Professional Photographer",
                      src: "/images/Teertha.jpeg"
                    }
                  ]}
                  autoplay={true}
                />
              </div>
            </section>

            {/* Let's Talk Section */}
            <section id="contact" className="py-20 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Let's Talk
                </motion.h2>
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-700/50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <a
                        href="mailto:annushnaik951@gmail.com"
                        className="flex items-center gap-4 p-4 rounded-xl bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
                      >
                        <IconMail className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="text-white">anushnaik951@gmail.com</p>
                        </div>
                      </a>
                      <a
                        href="tel:+917483418371"
                        className="flex items-center gap-4 p-4 rounded-xl bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
                      >
                        <IconPhone className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="text-white">+91 7483418371</p>
                        </div>
                      </a>
                    </div>
                    <div className="flex justify-center gap-6">
                      <a
                        href="https://github.com/codemasterio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-700/50 hover:bg-zinc-700 transition-colors group"
                      >
                        <IconBrandGithub className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                      </a>
                      <a
                        href="https://www.instagram.com/_anush_s_n_35/profilecard/?igsh=NWI4ZXFrcHlhcmgx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-700/50 hover:bg-zinc-700 transition-colors group"
                      >
                        <IconBrandInstagram className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/anush-naik-783b2327a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-zinc-700/50 hover:bg-zinc-700 transition-colors group"
                      >
                        <IconBrandLinkedin className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4 justify-center py-8 border-t border-zinc-800"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-500 transition-colors transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-500 transition-colors transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/_anush_s_n_35/profilecard/?igsh=NWI4ZXFrcHlhcmgx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-all transform hover:scale-110 text-pink-500 hover:text-blue-600"
              >
                <Instagram size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
