import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield, Clock, MapPin, Users, BarChart3, MessageSquare,
  CheckCircle2, ChevronRight, Menu, X, Phone, Mail, 
  Star, Zap, Target, Award, ArrowRight, Play,
  Smartphone, Globe, Lock, Bell, Calendar, FileText,
  Building, Factory, ShoppingBag, Truck, Home as HomeIcon,
  ChevronDown, Send, Sparkles, TrendingUp, IndianRupee
} from 'lucide-react';

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-2">
    <img 
      src="/iraforce-india/logo.jpeg" 
      alt="IRA FORCE" 
      className="h-10 md:h-12 w-auto"
    />
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
};

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 15,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-ira-cyan/30"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Magnetic Button Component (ReactBits inspired)
const MagneticButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

// Text Reveal Animation
const TextReveal = ({ children, className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Children Animation
const StaggerContainer = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// Navigation Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-dark py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-ira-cyan transition-colors font-medium animated-underline"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href="#demo" className="text-white/80 hover:text-white transition-colors">
                Book Demo
              </a>
              <MagneticButton className="btn-primary" onClick={() => window.location.href = '#contact'}>
                Get Started Free
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-semibold text-white hover:text-ira-cyan transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <MagneticButton className="btn-primary mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started Free
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg">
      <FloatingParticles />
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-ira-cyan/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ira-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y, opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-ira-cyan/10 border border-ira-cyan/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-ira-gold" />
              <span className="text-sm text-ira-cyan font-medium">
                #1 Security Workforce Platform in India
              </span>
            </motion.div>

            <motion.h1
              className="text-responsive-xl font-display font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transform Your{' '}
              <span className="gradient-text">Security Operations</span>
              {' '}with AI-Powered Management
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/70 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Clock-in from anywhere. Track guards in real-time. Eliminate attendance fraud. 
              Save up to ₹3 Lakhs annually on workforce management costs.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton className="btn-primary flex items-center gap-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <button className="btn-secondary flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-ira-cyan to-ira-blue border-2 border-ira-navy"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">500+ Companies</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-ira-gold fill-ira-gold" />
                ))}
                <span className="text-sm text-white/60">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Main dashboard mockup */}
              <motion.div
                className="glass rounded-2xl p-6 glow-cyan"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="bg-ira-navy/80 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-ira-deep/50 rounded-lg p-4">
                      <Users className="w-8 h-8 text-ira-cyan mb-2" />
                      <div className="text-2xl font-bold text-white">247</div>
                      <div className="text-xs text-white/60">Active Guards</div>
                    </div>
                    <div className="bg-ira-deep/50 rounded-lg p-4">
                      <MapPin className="w-8 h-8 text-ira-gold mb-2" />
                      <div className="text-2xl font-bold text-white">52</div>
                      <div className="text-xs text-white/60">Sites Live</div>
                    </div>
                    <div className="bg-ira-deep/50 rounded-lg p-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-xs text-white/60">On-Time</div>
                    </div>
                  </div>
                  <div className="mt-4 h-32 bg-ira-deep/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-full h-24 text-ira-cyan/40" />
                  </div>
                </div>
              </motion.div>

              {/* Floating notification cards */}
              <motion.div
                className="absolute -left-8 top-1/4 glass rounded-xl p-4 glow-cyan"
                animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Guard Clocked In</div>
                    <div className="text-xs text-white/60">Rajesh S. - Site A</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 glass rounded-xl p-4"
                animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ira-cyan/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-ira-cyan" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Patrol Complete</div>
                    <div className="text-xs text-white/60">All checkpoints verified</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { number: 50000, suffix: '+', label: 'Active Guards', icon: Users },
            { number: 500, suffix: '+', label: 'Companies Trust Us', icon: Building },
            { number: 99.9, suffix: '%', label: 'Uptime SLA', icon: Zap },
            { number: 3, suffix: ' Lakhs', label: 'Avg. Annual Savings', icon: IndianRupee },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-ira-cyan mx-auto mb-3" />
              <div className="stat-number text-3xl md:text-4xl mb-1">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-ira-cyan/50" />
      </motion.div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: Clock,
      title: 'Smart Attendance',
      description: 'Facial recognition, GPS geofencing, and OTP-based clock-in. Eliminate buddy punching forever.',
      color: 'from-ira-cyan to-blue-500',
    },
    {
      icon: MapPin,
      title: 'Live GPS Tracking',
      description: 'Real-time breadcrumbs, geofence alerts, and patrol route visualization on interactive maps.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Guard Tour System',
      description: 'NFC/QR checkpoints, route optimization, and exception flagging for missed patrols.',
      color: 'from-ira-gold to-orange-500',
    },
    {
      icon: MessageSquare,
      title: 'Team Communication',
      description: 'Instant messaging, group chats, media sharing, and real-time incident reporting.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'AI-powered insights, predictive scheduling, and comprehensive compliance reports.',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Offline-capable app works even in low-network areas. Available in 12 Indian languages.',
      color: 'from-teal-400 to-cyan-500',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-ira-navy via-ira-deep/50 to-ira-navy" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <TextReveal className="text-center mb-16">
          <span className="text-ira-cyan font-medium uppercase tracking-wider text-sm">Features</span>
          <h2 className="text-responsive-lg font-display font-bold mt-3 mb-4">
            Everything You Need to{' '}
            <span className="gradient-text-cyan">Manage Security</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From attendance tracking to incident management, IRA FORCE covers every aspect of 
            modern security workforce operations.
          </p>
        </TextReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="glass rounded-2xl p-6 card-hover h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`icon-container bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Feature highlight */}
        <motion.div
          className="mt-20 glass rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <span className="inline-flex items-center gap-2 text-ira-gold text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                MOST POPULAR FEATURE
              </span>
              <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                ROI Calculator: See Your Savings Instantly
              </h3>
              <p className="text-white/60 mb-6">
                Our smart ROI calculator shows you exactly how much you'll save on attendance fraud, 
                manual errors, and administrative overhead. Most customers see 300%+ ROI in the first year.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Reduce buddy punching by 100%',
                  'Cut payroll errors by 95%',
                  'Save 10+ hours weekly on admin',
                  'Improve guard accountability',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton className="btn-primary">
                Calculate Your Savings
              </MagneticButton>
            </div>
            <div className="bg-gradient-to-br from-ira-cyan/20 to-ira-blue/20 p-8 lg:p-12 flex items-center justify-center">
              <motion.div
                className="glass rounded-2xl p-6 w-full max-w-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h4 className="font-semibold mb-4">Monthly Savings Estimate</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Attendance Fraud Savings</span>
                    <span className="text-green-400 font-semibold">₹15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Admin Time Savings</span>
                    <span className="text-green-400 font-semibold">₹8,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Payroll Error Reduction</span>
                    <span className="text-green-400 font-semibold">₹5,000</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Monthly Savings</span>
                    <span className="text-2xl font-bold text-ira-gold">₹28,000</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Solutions Section
const Solutions = () => {
  const solutions = [
    { icon: Building, title: 'Corporate Security', desc: 'Office buildings & tech parks' },
    { icon: Factory, title: 'Manufacturing', desc: 'Industrial units & warehouses' },
    { icon: HomeIcon, title: 'Residential', desc: 'Societies & gated communities' },
    { icon: ShoppingBag, title: 'Retail & Malls', desc: 'Shopping centers & stores' },
    { icon: Hospital, title: 'Healthcare', desc: 'Hospitals & clinics' },
    { icon: Truck, title: 'Logistics', desc: 'Warehouses & distribution' },
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-ira-deep" />
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--ira-cyan), transparent)',
        }}
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <TextReveal className="text-center mb-16">
          <span className="text-ira-cyan font-medium uppercase tracking-wider text-sm">Solutions</span>
          <h2 className="text-responsive-lg font-display font-bold mt-3 mb-4">
            Built for Every{' '}
            <span className="gradient-text">Indian Industry</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From Mumbai high-rises to Chennai IT parks, IRA FORCE adapts to your unique 
            security requirements.
          </p>
        </TextReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {solutions.map((solution, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="glass rounded-xl p-6 text-center card-hover cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-ira-cyan/20 to-ira-blue/20 flex items-center justify-center group-hover:from-ira-cyan group-hover:to-ira-blue transition-all duration-300">
                  <solution.icon className="w-7 h-7 text-ira-cyan group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{solution.title}</h3>
                <p className="text-xs text-white/50">{solution.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Case Study Highlight */}
        <motion.div
          className="mt-20 grid lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="order-2 lg:order-1">
            <span className="text-ira-gold text-sm font-medium uppercase tracking-wider">Case Study</span>
            <h3 className="text-2xl lg:text-3xl font-display font-bold mt-2 mb-4">
              How ABC Security Saved ₹50 Lakhs Annually
            </h3>
            <p className="text-white/60 mb-6">
              With 2,000+ guards across 150 sites in Maharashtra, ABC Security was losing money 
              to attendance fraud and manual errors. IRA FORCE changed everything.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { number: '100%', label: 'Fraud Eliminated' },
                { number: '85%', label: 'Admin Time Saved' },
                { number: '₹50L', label: 'Annual Savings' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-ira-cyan">{stat.number}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 text-ira-cyan hover:text-white transition-colors">
              <span>Read Full Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <motion.div
              className="glass rounded-2xl p-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ira-cyan to-ira-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">AS</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-ira-gold fill-ira-gold" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-4">
                    "IRA FORCE transformed our operations. We went from spending 20 hours a week 
                    on attendance reconciliation to just 2 hours. The ROI was visible in the first month."
                  </p>
                  <div>
                    <div className="font-semibold">Amit Shah</div>
                    <div className="text-sm text-white/60">CEO, ABC Security Services</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'Up to 10 users',
      description: 'Perfect for small security agencies getting started.',
      features: [
        'Basic attendance tracking',
        'GPS clock-in/out',
        'Mobile app access',
        'Basic reports',
        'Email support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '₹2,499',
      period: '/month for 30 users',
      description: 'For growing agencies needing advanced features.',
      features: [
        'Everything in Starter',
        'Geofencing & patrol tracking',
        'Guard tour management',
        'Team messaging',
        'Advanced analytics',
        'Priority support',
        'Custom reports',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'Unlimited users',
      description: 'For large organizations with complex requirements.',
      features: [
        'Everything in Professional',
        'SOC Command Center',
        'API access & integrations',
        'Dedicated success manager',
        'Custom development',
        'SLA guarantee',
        'On-premise option',
        '24/7 phone support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 hero-bg" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <TextReveal className="text-center mb-16">
          <span className="text-ira-cyan font-medium uppercase tracking-wider text-sm">Pricing</span>
          <h2 className="text-responsive-lg font-display font-bold mt-3 mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees. Cancel anytime.
          </p>
        </TextReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <StaggerItem key={index}>
              <motion.div
                className={`glass rounded-2xl p-6 lg:p-8 h-full flex flex-col ${
                  plan.popular ? 'pricing-popular border border-ira-gold/50 glow-gold' : ''
                }`}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl lg:text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/60 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-white/60 text-sm mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-ira-gold to-orange-500 text-ira-navy hover:shadow-lg hover:shadow-ira-gold/30'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </MagneticButton>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust signals */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 mb-6">Trusted by leading security companies across India</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['SIS', 'G4S India', 'Tops Security', 'Checkmate', 'Premier Shield'].map((brand, i) => (
              <div key={i} className="text-xl font-display font-bold text-white/60">
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    guards: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you! We will contact you shortly.');
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-ira-deep" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <TextReveal>
            <span className="text-ira-cyan font-medium uppercase tracking-wider text-sm">Contact Us</span>
            <h2 className="text-responsive-lg font-display font-bold mt-3 mb-4">
              Ready to Transform Your{' '}
              <span className="gradient-text-cyan">Security Operations?</span>
            </h2>
            <p className="text-white/60 mb-8">
              Get a personalized demo and see how IRA FORCE can save you time and money. 
              Our team will set up everything for you.
            </p>

            <div className="space-y-6 mb-8">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 1800-123-4567 (Toll Free)' },
                { icon: Mail, label: 'Email', value: 'sales@iraforce.in' },
                { icon: Globe, label: 'Offices', value: 'Mumbai • Delhi • Bangalore • Chennai' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ira-cyan/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-ira-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-4">
              {['ISO 27001', 'SOC 2', 'GDPR'].map((cert, i) => (
                <div key={i} className="glass rounded-lg px-4 py-2 text-sm">
                  <Lock className="w-4 h-4 inline mr-2 text-green-400" />
                  {cert} Certified
                </div>
              ))}
            </div>
          </TextReveal>

          <motion.div
            className="glass rounded-2xl p-6 lg:p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Get Your Free Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Work Email *"
                  required
                  className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name *"
                  required
                  className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <select
                className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors text-white/60"
                value={formData.guards}
                onChange={(e) => setFormData({ ...formData, guards: e.target.value })}
              >
                <option value="">Number of Guards</option>
                <option value="1-50">1-50 Guards</option>
                <option value="51-200">51-200 Guards</option>
                <option value="201-500">201-500 Guards</option>
                <option value="501-1000">501-1000 Guards</option>
                <option value="1000+">1000+ Guards</option>
              </select>
              <textarea
                placeholder="Tell us about your requirements..."
                rows={4}
                className="w-full bg-ira-navy/50 border border-white/10 rounded-lg px-4 py-3 focus:border-ira-cyan focus:outline-none transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <MagneticButton className="btn-primary w-full flex items-center justify-center gap-2">
                <span>Request Demo</span>
                <Send className="w-5 h-5" />
              </MagneticButton>
              <p className="text-xs text-white/40 text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Mobile App', 'Integrations', 'API Docs'],
    Solutions: ['Corporate', 'Manufacturing', 'Residential', 'Healthcare', 'Retail'],
    Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'GDPR', 'Security'],
  };

  return (
    <footer className="bg-ira-navy py-16 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-white/60 mt-4 max-w-sm">
              India's most trusted security workforce management platform. 
              Powering 50,000+ guards across 500+ companies.
            </p>
            <div className="flex gap-4 mt-6">
              {['facebook', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ira-cyan/20 transition-colors"
                >
                  <Globe className="w-5 h-5 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-ira-cyan transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2024 IRA FORCE. All rights reserved. Made with ❤️ in India
          </p>
          <div className="flex items-center gap-4">
            <img src="https://img.shields.io/badge/Google_Play-Download-green?style=flat-square" alt="Play Store" className="h-8" />
            <img src="https://img.shields.io/badge/App_Store-Download-blue?style=flat-square" alt="App Store" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-ira-navy flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-ira-cyan/30 border-t-ira-cyan rounded-full mx-auto mb-4"
          />
          <div className="text-ira-cyan font-display text-xl">Loading IRA FORCE...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ira-navy">
      <Navbar />
      <Hero />
      <Features />
      <Solutions />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
