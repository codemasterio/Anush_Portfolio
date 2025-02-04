import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Terminal, Rocket, Book, Code2, Briefcase, GraduationCap, Award, Phone, MapPin, Menu, X } from 'lucide-react';
import { SplineScene } from './components/ui/splite';
import { Card } from './components/ui/card';
import { QuoteAnimation } from './components/QuoteAnimation';
import { AnimatedTestimonials } from './components/ui/animated-testimonials';
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconMail, IconPhone } from '@tabler/icons-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "home", label: "Home" },
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

  const sectionClass = "relative group transition-all duration-300 hover:bg-zinc-900/70";
  const sectionGlowClass = "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl pointer-events-none";

  return (
    <div className="min-h-screen bg-black text-white">
      <QuoteAnimation />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold"
                  >
                    ANUSH<span className="text-blue-500">NAIK</span>
                  </motion.h1>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex space-x-8">
                    {sections.map((section) => (
                      <motion.button
                        key={section.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection(section.id)}
                        className="text-gray-300 hover:text-blue-500 transition-colors"
                      >
                        {section.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 hover:text-blue-500 transition-colors"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="md:hidden bg-zinc-900 border-b border-zinc-800"
                >
                  <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col space-y-4">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="text-gray-300 hover:text-blue-500 transition-colors text-left"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </nav>

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
                        href="https://drive.google.com/file/d/1EFOjC3OIAmfkxXGEY7vCWEws_5lRDIT3/view?usp=sharing"
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
                  <div className="md:w-1/2 h-[500px]">
                    <SplineScene
                      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-20">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Education
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "B.E Computer Science",
                      institution: "G M INSTITUTE OF TECHNOLOGY",
                      year: "Expected 2026",
                      icon: <GraduationCap />
                    },
                    {
                      title: "Pre-University",
                      institution: "Jawahar Navodaya Vidyalaya, Mundgod",
                      year: "2022",
                      icon: <Book />
                    },
                    {
                      title: "Secondary School",
                      institution: "Jawahar Navodaya Vidyalaya, Mundgod",
                      year: "2015-2020",
                      icon: <Book />
                    }
                  ].map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <Card className="bg-zinc-900 border-zinc-800 p-6 h-full hover:border-blue-500 hover:bg-zinc-800/50 transition-all duration-300">
                        <div className="text-blue-500 mb-4">{edu.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{edu.title}</h3>
                        <p className="text-gray-400">{edu.institution}</p>
                        <p className="text-blue-500 mt-2">{edu.year}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-12 text-center"
                >
                  Experience
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-blue-500 hover:bg-zinc-800/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Briefcase className="text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Junior Web Developer</h3>
                      <p className="text-gray-400">Kakud Pvt. Ltd | Jan 2024 - Dec 2024</p>
                      <p className="text-gray-400">Shivamogga, India</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <Briefcase className="text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Data Science with AI intern</h3>
                      <p className="text-gray-400">LabMentix | Jan 2025</p>
                      <p className="text-gray-400">Banglore, India</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
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
                      link: "#"
                    },
                    {
                      title: "Teertha Photography",
                      description: "A Portfolio Website for My client who is a Photographer",
                      image: "/images/Teerthaphotography.png",
                      tech: ["Next.js", "React.js", "Framer","MongoDB"],
                      link: "https://taupe-pixie-3e491f.netlify.app/"
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
            <section id="skills" className="py-20">
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
            <section id="contact" className="py-20 bg-zinc-900/50">
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
                className="p-2 hover:text-blue-500 transition-colors transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;